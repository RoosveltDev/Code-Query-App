import ChatList from "../../components/ChatList/ChatList"
import './chat.css'
import ChatPanel from "../../components/ChatPanel/ChatPanel"
import { useState } from "react"
import useFetch from "../../hook/useFetch"
import { fetchedChatList } from "../../types/chat/fetchedChatList.type"
import useResize from "../../hook/useResize"
const Chat = () => {

  const [data,setData] = useFetch<fetchedChatList[]>({fetchOptions:{
    context: "chats",
    method: "GET",
    data: {},
    hasCredentials: true,
    bodyFormat: "row" ,
  }})
  const [indexChatClicked,setIndexChatClicked] = useState<number>(0)
  const [isClicked,setIsClicked] = useState<boolean>(false)
  const [isMobile,containerRef,setIsMobile] = useResize(setIsClicked)

  return (
        <div ref={containerRef} className="container-main-chat">
           { !isClicked &&
              <div className="container-main-chat__list">
              <ChatList setIndexChatClicked={setIndexChatClicked} setData={setData} data={data} isMobile={isMobile} setIsMobile={setIsMobile} setIsClicked = {setIsClicked} ></ChatList>
             </div>
           }
            {
              (!isMobile || (isClicked && isMobile) ) && <div className="container-main-chat__panel">
              {data && data.length>0 && <ChatPanel userChat={data[indexChatClicked]}></ChatPanel>}
            </div>
            }
            
        </div>
  )
}

export default Chat
