import call from '../../assets/Call.svg'
import video from '../../assets/Video.svg'
import more from '../../assets/More.svg'
import './chatPanel.css'

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
    </div>
  )
}

export default ChatPanel
