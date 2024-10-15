import Avatar from "../../atoms/avatar/Avatar"
import { UserChatCardType } from "../../types/chat/userChatCard.type"
import './userChatCard.css'
const UserChatCard = ({isChatStatus = false,handleClickUserCard,elementCard,isOnline= false,text}:UserChatCardType) => {
  const textNote = text ? text : isOnline? "Online":"Offline"
  return (
    <div onClick={handleClickUserCard ? (e)=>{handleClickUserCard(e)}:undefined} className="user-chat-card-container">
      <Avatar isActive={isOnline}></Avatar>
      <div className="user-chat-card-container__information chat-user-info">
        <h1 className="chat-user-info__header" >{elementCard.user.name}</h1>
        <p className="chat-user-info__paragraph">{textNote}</p>
      </div>
      {isChatStatus && <p className="user-chat-card-container__text">1 min ago</p>}
    </div>
  )
}

export default UserChatCard
