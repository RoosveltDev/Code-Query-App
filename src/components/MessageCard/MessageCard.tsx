import useUser from "../../hook/useUser"
import { MessageChatType } from "../../types/chat/messageCard.type"
import './messageCard.css'

const MessageCard = ({chatMessage}:MessageChatType) => {
  const {user} = useUser()
  const classMessage = chatMessage.owner_id === user.id ? "message-card-container message-card-container--own" : "message-card-container message-card-container--other"
  const classMessageParagraph =  chatMessage.owner_id === user.id ? "message-card-container__paragraph " : "message-card-container__paragraph message-card-container__paragraph--other"
  return (
    <div className={classMessage}>
            <p className={classMessageParagraph}>
                {chatMessage.message}
            </p>
    </div>
    
  )
}

export default MessageCard
