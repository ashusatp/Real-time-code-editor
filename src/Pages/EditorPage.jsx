import React from 'react'
import { useState } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'

const EditorPage = () => {
  const [clients,setClients] = useState([
    {socketId: 1, userName: 'Ashutosh'},
    {socketId: 2, userName: 'Shiv'},
    {socketId: 3, userName: 'Aryan'},
    {socketId: 5, userName: 'KKr'},
    {socketId: 6, userName: 'KKr'},
    {socketId: 4, userName: 'KK'},
  ])
  return (
    <div className='mainWrap'>
      <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img
                            className="logoImage"
                            src="/connect-logo2.png"
                            alt="logo"
                        />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client)=>{
                          return <Client key={client.socketId} userName={client.userName}/>
                        })}
                    </div>
                </div>
                <button className="btn copyBtn">
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn">
                    Leave
                </button>
            </div>
      <div className="editorWrap">
        <Editor/>
      </div>
    </div>
  )
}

export default EditorPage