import { editor } from "monaco-editor"
import { LiveCodingPanelType } from "../liveCoding/liveCodingPanel.type"
export type CodingPanelType =LiveCodingPanelType &  {
    editorRef:React.MutableRefObject<editor.IStandaloneCodeEditor | null>
    
    
}