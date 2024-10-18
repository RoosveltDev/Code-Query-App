import { Socket } from "socket.io-client"
import sanitizeInput from "../../../utils/sanitize"
import { FetchedMessageType, MessageType } from "../../../types/chat/fetchedMessage.type"

export const handleSubmitSend=(e:React.FormEvent<HTMLFormElement>,socket:Socket,owner_id:number,setData:React.Dispatch<React.SetStateAction<FetchedMessageType | null>>)=>{
    e.preventDefault()
    const inputMessage = document.querySelector('.message-chat-container__input') as HTMLInputElement
    const message = sanitizeInput(inputMessage.value.trim())
    if(message !== "") {
        socket.emit('message', { message, owner_id }, (response:{success:boolean,error:string,record:MessageType}) => {
            if (response.success) {
                inputMessage.value=""
                setData((prev)=>{
                    if(prev) return [...prev,response.record]
                    else return [response.record]
                })
                
                
            } else {
                console.error("Error sending message:", response.error);
            }
        });
    }
        
}