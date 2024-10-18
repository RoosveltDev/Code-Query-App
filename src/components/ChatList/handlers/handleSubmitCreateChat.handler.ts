import makeRequest from "../../../services/api.service"
import { fetchedChatList } from "../../../types/chat/fetchedChatList.type"

export const handleSubmitCreateChat = async (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,setData:React.Dispatch<React.SetStateAction<fetchedChatList[]| null>>)=>{
    e.preventDefault()
    const signal = controlSignal.signal
    const input =document.querySelector('.input-container__input') as HTMLInputElement
    const {status,results} = await makeRequest(signal,"chats","POST",{email:input.value},true)
    if(status===201) {
        setData((prev)=>{
            if (prev) return [...prev, results]
            else return [results]
        })
    }
}
export const handleSubmitCreateChatCurrying=(setData:React.Dispatch<React.SetStateAction<fetchedChatList[]| null>>)=>{
    return (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController)=>{
        return handleSubmitCreateChat(e,controlSignal,setData)
    }
}