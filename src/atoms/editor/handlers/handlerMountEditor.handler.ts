import { editor } from "monaco-editor"

export const handleMountEditor = (editorRef:React.MutableRefObject<editor.IStandaloneCodeEditor | null>,editor:editor.IStandaloneCodeEditor)=>{
    editorRef.current = editor
}