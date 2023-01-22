import React, { useEffect, useState } from "react";
import cm from "codemirror";
import "codemirror/lib/codemirror.css";
import { useRef } from "react";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = () => {
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      async function init() {
        cm.fromTextArea(document.getElementById("realtimeEditor"), {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });
      }

      return () => {
        init();
        effectRan.current = true;
      };
    }
  }, []);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
