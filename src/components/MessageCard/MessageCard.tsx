import { MessageChatType } from "../../types/chat/messageCard.type"
import './messageCard.css'

const MessageCard = ({isMine}:MessageChatType) => {
  const classMessage = isMine ? "message-card-container message-card-container--own" : "message-card-container message-card-container--other"
  const classMessageParagraph = isMine ? "message-card-container__paragraph " : "message-card-container__paragraph message-card-container__paragraph--other"
  return (
    <div className={classMessage}>
            <p className={classMessageParagraph}>
      
            </p>
    </div>
    
  )
}

export default MessageCard
