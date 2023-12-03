import React, { useEffect, useState } from "react";
// import cm from "codemirror";
// import "codemirror/lib/codemirror.css";
import { useRef } from "react";
// import "codemirror/theme/dracula.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Action";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { Compartment, EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";

const Editor = ({ socketRef, roomId }) => {
  // const effectRan = useRef(false);
  // const editorRef = useRef(null);

  // useEffect(() => {
  //   if (effectRan.current === false) {
  //     async function init() {
  //       editorRef.current = cm.fromTextArea(
  //         document.getElementById("realtimeEditor"),
  //         {
  //           mode: { name: "javascript", json: true },
  //           theme: "dracula",
  //           autoCloseTags: true,
  //           autoCloseBrackets: true,
  //           lineNumbers: true,
  //         }
  //       );

  //       editorRef.current.on("change", (instance, changes) => {
  //         const { origin } = changes;
  //         const code = instance.getValue();
  //         if (origin !== "setValue") {
  //           socketRef.current.emit(ACTIONS.CODE_CHANGE, {
  //             roomId,
  //             code,
  //           });
  //         }
  //       });
  //       // editorRef.current.setValue(`console.log("hi)`)
  //     }

  //     return () => {
  //       init();
  //       effectRan.current = true;
  //     };
  //   }
  // }, []);

  const editor = useRef();
  const codeMirrorRef = useRef();

  const updateValue = EditorView.updateListener.of(function (e) {
    // console.log(e.selectionSet);
    if (e.selectionSet) {
      const code = e.state.doc.toString();
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        code,
      });
    }
  });

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log(code);
        if (code !== null) {
          codeMirrorRef.current.dispatch({
            changes: {from: 0, to: codeMirrorRef.current.state.doc.length, insert: code}
          });
        }
      });
    }
  }, [socketRef.current]);

  useEffect(() => {
    const editorTheme = new Compartment();
    const customTheme = EditorView.theme({
      "&": {
        color: "#DDD",
        fontSize: "25px",
        fontFamily: "'Roboto Mono',Consolas,monospace",
      },
    });
    const startState = EditorState.create({
      extensions: [
        updateValue,
        customTheme,
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        javascript(),
        editorTheme.of(oneDark),
      ],
    });

    const view = new EditorView({
      state: startState,
      extensions: [customTheme],
      parent: editor.current,
    });

    codeMirrorRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editor}></div>;
};

export default Editor;
