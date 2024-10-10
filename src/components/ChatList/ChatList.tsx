
import Search from "../../atoms/search/Search"
import UserChatCard from "../userChatCard/UserChatCard"
import './chatlist.css'
import plus from '../../assets/Plus.svg'
import { chatListType } from "../../types/chat/chatList.type"
import { handleClickChat, handleClickChatMobile } from "./handlers/handleClickChatCard.handle"
const ChatList = ({isMobile,setIsClicked,setIsMobile}:chatListType) => {
  const handleClickCard = isMobile ? handleClickChatMobile : handleClickChat
  return (
    
    <div className="user-chat-list-container">
        <div className="user-chat-list-container__header chat-list-header-container">
            <h1 className="chat-list-header-container__h1">Messages</h1>
            <div className="chat-list-header-container__button"> 
                <img src={plus} alt="plus icon" />
            </div>
        </div>
        <Search></Search>
        <div className="user-chat-list-container__principal main-user-chat-list-container">
            <div className="main-user-chat-list-container__header header-main-chat-user-list">
                <p className="header-main-chat-user-list__element header-main-chat-user-list__element--active">All</p>
                <p className="header-main-chat-user-list__element">Personal</p>
                <p className="header-main-chat-user-list__element">Teams</p>
            </div>
            <UserChatCard handleClickUserCard={()=> handleClickCard(setIsClicked,setIsMobile)}  isChatStatus={true} name={"Shelby Goode"} text={"Lorem Ipsum is simply dummy text of the printing "}></UserChatCard>
        </div>
    </div>

  )
}

export default ChatList
