import './codingPanel.css'
import Editor from '../../atoms/editor/Editor'
import { handleChangeLanguage } from './handlers/handleChangeLanguage'
import { useEffect, useRef, useState } from 'react'
import { LanguageType } from '../../types/editor/editor.type'
import { CodingPanelType } from '../../types/editor/codingPanel.type'
import { io, Socket } from 'socket.io-client'
import { config } from '../../config'
import {  handleEditorChangeCurrying } from './handlers/handleEditorChange.handler'

const CodingPanel = ({editorRef,running,questionId,setIsRunning}:CodingPanelType) => {
  const [language,setLanguage] = useState<LanguageType>('javascript')
  const socketRef = useRef<Socket|null>(null)
  const [connected,setIsConnected] = useState<boolean>(false)
  const loaderRef = useRef<HTMLDivElement|null>(null)
  const changeRef = useRef<boolean>(true)
  const [consoleOutput,setConsoleOutput] = useState<string>('')
  useEffect(()=>{
    if(running) socketRef.current?.emit('execute',{value:editorRef.current?.getValue(),language:editorRef.current!.getModel()?.getLanguageId()})
  },[running])
  useEffect(()=>{
    const socket  = io(`${config.SERVER_URL}/live`, {
      transports: ['websocket'], 
      query: { questionId  }
    })
    socket.on('connect',()=>{
      socketRef.current = socket
      const textLoader = document.querySelector('.overlay-coding-container__text')
      textLoader!.textContent = 'Waiting other members'
      socket.emit('joinLive')
    })
    socket.on('online',()=>{
      setIsConnected(true)
    })
    socket.on('leave',()=>{
      setIsConnected(false)
      setTimeout(() => {
        if (loaderRef.current) loaderRef.current.textContent = 'Session terminated'
        socket.disconnect()
      }, 0)
    })
    socket.on('incommingEditorChange',(value)=>{
      changeRef.current = false
      editorRef.current?.setValue(value)
    })
    socket.on('compiled',(data)=>{
      
      setConsoleOutput(data.output)
      setIsRunning(false)
    })
    socket.on('running',()=>{
      setIsRunning(true)
    })

    return ()=>{
     socket.disconnect()
    } 
  },[])
  return (
    
    <div className='codingPanel-main-container'>
      <div className='coding-panel-header-container'>
        <div className='coding-panel-header-container__element element-coding-panel-container'>
        <svg className='element-coding-panel-container__logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>
          <p className='element-coding-panel-container__text'>Code</p>
        </div>
      </div>
      <div className='codingPanel-main-container__select-container select-coding-panel-container'>
        <select onChange={()=>{handleChangeLanguage(setLanguage)}}className='select-coding-panel-container__languagues' name="languague" id="code-languague">
          <option value="javascript">javascript</option>
          <option value="python">python</option>
          <option value="sql">SQL</option>
          <option value="java">java</option>
          <option value="php">php</option>
          <option value="typescript">typescript</option>
        </select>
      </div>
      <div className='codingPanel-main-container__editor codingpanel-editor-container'>
       <Editor onChange={handleEditorChangeCurrying(socketRef.current!,changeRef)} classEditor={'editor-code'} code={'console.log("Hola Mundo")'} language={language} editorRef={editorRef} disabled={running}></Editor>
      </div>
      <div className='codingPanel-main-container__console coding-panel-container-console'>
      <div className='coding-panel-header-container'>
        <div className='coding-panel-header-container__element element-coding-panel-container'>
        <svg className='element-coding-panel-container__logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
          <p className='element-coding-panel-container__text'>Console</p>
        </div>
      </div>
      <Editor disabled={true} classEditor={'console-code'} code={""} value={consoleOutput}></Editor>
      </div>
      {
        !connected && <div className="codingPanel-main-container__overlay overlay-coding-container">
        <div className="overlay-coding-container__spinner"></div>
        <p ref={loaderRef} className='overlay-coding-container__text'>Connecting to the room ...</p>
      </div>
      }
      
    </div>
  )
  
  
 
}
export default CodingPanel
