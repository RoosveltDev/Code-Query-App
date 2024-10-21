/* Classname for classEditor  width should use !important */
import './editor.css'
import { Editor as EditorMonaco } from '@monaco-editor/react';
import { EditorType } from '../../types/editor/editor.type';
import { handleMountEditor } from './handlers/handlerMountEditor.handler';
const Editor = ({classEditor,code,theme='vs-dark',disabled,language,editorRef,onChange,value}:EditorType) => {
    const classNameEditor = disabled ? `${classEditor} editor--disabled` : classEditor
    return <EditorMonaco onChange={onChange?(value)=>{onChange(value)}:undefined} onMount={editorRef?(editor)=>{handleMountEditor(editorRef,editor)}:undefined} language={language} className={classNameEditor} defaultLanguage="javascript" defaultValue={code} value={value?value:undefined} theme={theme} />;
  
}

export default Editor
