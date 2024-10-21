import { editor } from "monaco-editor"
export type EditorType={
    code:string;
    disabled?:boolean;
    theme?:"vs-dark" | "light";
    classEditor?:string;
    language?: LanguageType;
    editorRef?:React.MutableRefObject<editor.IStandaloneCodeEditor | null>
    onChange?:(value:string|undefined)=>void
    value?:string
}
export type LanguageType= 'javascript'|'java'|'python'|'sql'|'typescript'|'php';
