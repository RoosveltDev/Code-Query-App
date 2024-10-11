import call from '../../assets/Call.svg'
import video from '../../assets/Video.svg'
import more from '../../assets/More.svg'
import './chatPanel.css'
import send from '../../assets/send.svg'
import smile from "../../assets/Smile.svg"
import clip from "../../assets/clip.svg"

import UserChatCard from "../userChatCard/UserChatCard"
const ChatPanel = () => {
  return (
    <div className="chat-panel-container">
      <div className="chat-panel-container__header panel-chat-header">
            <UserChatCard name={"Shelby Goodman"} text='Online'></UserChatCard>
            <div className="panel-chat-header__actions actions-chat-panel-container">
            <div className="actions-chat-panel-container__element header-panel-element header-panel-element--media "> <img className='header-panel-element__image'  src={call} alt="phone logo" /></div>
            <div className="actions-chat-panel-container__element header-panel-element header-panel-element--media"> <img className='header-panel-element__image' src={video} alt="video logo" /></div>
            <div className="actions-chat-panel-container__element header-panel-element"> <img className='header-panel-element__image' src={more} alt="more logo" /> </div>
            </div>
      </div>
      <div className='chat-panel-container__messages'></div>
      <form className='chat-panel-container__prompt prompt-chat-form'>
        <div className='prompt-chat-form__input-container message-chat-container'>
        <figure className='message-chat-container__figure chat-prompt-figure'>

            <img className='chat-prompt-figure__image' src={clip} alt="clip logo" />
        </figure>
        <input className='message-chat-container__input' type="text" placeholder='Type a message...' />

        </div>
        <div className='prompt-chat-form__user-action prompt-send-container'>
            <img className='prompt-send-container__element' src={smile} alt="smile logo" />
            <img className='prompt-send-container__element' src={send} alt="send" />
        </div>

      </form>
    </div>
  )
}

export default ChatPanel
