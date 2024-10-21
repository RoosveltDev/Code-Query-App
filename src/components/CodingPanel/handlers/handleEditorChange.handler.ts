import { Socket } from "socket.io-client"

export const handleEditorChange=(value:string|undefined,socket:Socket,changeRef:React.MutableRefObject<boolean>)=>{
    if(changeRef.current) socket.emit('changeEditor',value)
    else changeRef.current=true
    
}
export const handleEditorChangeCurrying=(socket:Socket,changeRef:React.MutableRefObject<boolean>)=>{
    return (value:string|undefined)=>{
        handleEditorChange(value,socket,changeRef)
    }
}