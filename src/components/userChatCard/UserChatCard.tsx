import Avatar from "../../atoms/avatar/Avatar"
import { UserChatCardType } from "../../types/chat/userChatCard.type"
import './userChatCard.css'
const UserChatCard = ({text,name,isChatStatus = false,handleClickUserCard}:UserChatCardType) => {
  return (
    <div onClick={handleClickUserCard} className="user-chat-card-container">
      <Avatar isActive={true}></Avatar>
      <div className="user-chat-card-container__information chat-user-info">
        <h1 className="chat-user-info__header" >{name}</h1>
        <p className="chat-user-info__paragraph">{text}</p>
      </div>
      {isChatStatus && <p className="user-chat-card-container__text">1 min ago</p>}
    </div>
  )
}

export default UserChatCard
