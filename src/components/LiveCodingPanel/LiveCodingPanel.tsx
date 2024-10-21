import './liveCodingPanel.css'
import { editor } from "monaco-editor"
import CodingDescription from '../CodingDescription/CodingDescription'
import CodingPanel from '../CodingPanel/CodingPanel'
import { useRef } from 'react'
import { LiveCodingPanelType } from '../../types/liveCoding/liveCodingPanel.type'

const LiveCodingPanel = ({running,setIsRunning,questionId}:LiveCodingPanelType) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor|null>(null)
   
  return (
    <div className='live-main-container__layout'>
      <div className='live-main-container__description-question'>
        <CodingDescription></CodingDescription>
      </div>
      <div className='live-main-container__coding-panel'>
      
        <CodingPanel questionId={questionId} running={running} setIsRunning={setIsRunning} editorRef={editorRef}></CodingPanel>
      </div>
      </div>
  )
}

export default LiveCodingPanel
