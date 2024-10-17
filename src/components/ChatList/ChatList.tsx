
import Search from "../../atoms/search/Search"
import UserChatCard from "../userChatCard/UserChatCard"
import './chatlist.css'
import plus from '../../assets/Plus.svg'
import { chatListType } from "../../types/chat/chatList.type"
import {  handleClickChatCurrying, handleClickChatMobileCurrying } from "./handlers/handleClickChatCard.handle"
import { handleCreateChat } from "./handlers/handleCreateChat.handle"
import { useState } from "react"
import PopUp from "../PopUp/PopUp"
import {  handleSubmitCreateChatCurrying } from "./handlers/handleSubmitCreateChat.handler"
import { fetchedChatList } from "../../types/chat/fetchedChatList.type"
const ChatList = ({isMobile,setIsClicked,setIsMobile,data,setData,setIndexChatClicked}:chatListType) => {
  const [isCreatedChat,setIsCreatedChat] = useState<boolean>(false)
  return (
    
    <div className="user-chat-list-container">
        <div className="user-chat-list-container__header chat-list-header-container">
            <h1 className="chat-list-header-container__h1">Messages</h1>
            <div onClick={()=>{handleCreateChat(setIsCreatedChat)}} className="chat-list-header-container__button"> 
                <img  src={plus} alt="plus icon" />
            </div>
        </div>
        <Search<fetchedChatList> setData={setData} data={data!} target={['user','name']} ></Search>
        <div className="user-chat-list-container__principal main-user-chat-list-container">
            <div className="main-user-chat-list-container__header header-main-chat-user-list">
                <p className="header-main-chat-user-list__element header-main-chat-user-list__element--active">All</p>
                <p className="header-main-chat-user-list__element">Personal</p>
                <p className="header-main-chat-user-list__element">Teams</p>
            </div>
            {
                data && data.length > 0 && data!.map((element)=>{
                    return <UserChatCard text={element.user.last_message!} key={element.user.id} elementCard={element} handleClickUserCard={isMobile ? handleClickChatMobileCurrying(setIsClicked,setIsMobile,setIndexChatClicked) : handleClickChatCurrying(setIndexChatClicked)}  isChatStatus={true}></UserChatCard>
                })
            }
            
        </div>
        {isCreatedChat && <PopUp text="Create Chat" submit={handleSubmitCreateChatCurrying(setData)} setIsCreatedChat={setIsCreatedChat} inputs={[{type:"email",label:"Email"}]}></PopUp>}
    </div>

  )
}

export default ChatList
