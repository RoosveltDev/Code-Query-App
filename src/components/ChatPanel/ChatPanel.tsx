import call from '../../assets/Call.svg'
import video from '../../assets/Video.svg'
import more from '../../assets/More.svg'
import './chatPanel.css'
import send from '../../assets/send.svg'
import smile from "../../assets/Smile.svg"
import clip from "../../assets/clip.svg"
import { io,Socket } from 'socket.io-client';
import UserChatCard from "../userChatCard/UserChatCard"
import { useEffect, useRef, useState } from 'react'
import { config } from '../../config'
import { fetchedChatList } from '../../types/chat/fetchedChatList.type'

import MessageCard from '../MessageCard/MessageCard'
import { FetchedMessageType } from '../../types/chat/fetchedMessage.type'
import { handleSubmitSend } from './handlers/handleSubmitSend.handler'
import useUser from '../../hook/useUser'

const ChatPanel = ({userChat}:{userChat:fetchedChatList}) => {
  const [data,setData] = useState<FetchedMessageType|null>(null)
  const socketRef = useRef<Socket|null>(null)
  const {user} = useUser()
  const [online,setIsOnline] = useState<boolean>(false)
  useEffect(()=>{
      const socket  = io(config.SERVER_URL, {
        transports: ['websocket'], 
        query: {
          chatId: userChat.id 
      }
      })
      socket.on('connect', () => {
        socketRef.current = socket
        const input = document.querySelector('.message-chat-container__input') as HTMLInputElement
        input.disabled = false
        socket.emit('join')
    });
    socket.on('allMessages',(data)=>{
      setData(data.results.reverse())
    })
    socket.on('online',()=>{
      setIsOnline(true)
    })
    socket.on('leave',()=>{
      setIsOnline(false)
    })
    socket.on('incommingMessage',(message)=>{
      setData((prev)=>{
        if(prev) return [...prev,message]
        else return [message]
    })
    })
      return (()=>{
        socket.disconnect()
      })

  },[userChat.id])
  return (
    <div className="chat-panel-container">
      {
          userChat && <>
             <div className="chat-panel-container__header panel-chat-header">
            <UserChatCard elementCard={userChat}  isOnline={online}></UserChatCard>
            <div className="panel-chat-header__actions actions-chat-panel-container">
            <div className="actions-chat-panel-container__element header-panel-element header-panel-element--media "> <img className='header-panel-element__image'  src={call} alt="phone logo" /></div>
            <div className="actions-chat-panel-container__element header-panel-element header-panel-element--media"> <img className='header-panel-element__image' src={video} alt="video logo" /></div>
            <div className="actions-chat-panel-container__element header-panel-element"> <img className='header-panel-element__image' src={more} alt="more logo" /> </div>
            </div>
      </div>
      <div className='chat-panel-container__messages'>
        {data && data.map((element)=>{
          return  <MessageCard key={element.id} chatMessage={element}></MessageCard>
        })}

      </div>
      <form onSubmit={(e)=>handleSubmitSend(e,socketRef.current!,user.id,setData)} className='chat-panel-container__prompt prompt-chat-form'>
        <div className='prompt-chat-form__input-container message-chat-container'>
        <figure className='message-chat-container__figure chat-prompt-figure'>

            <img className='chat-prompt-figure__image' src={clip} alt="clip logo" />
        </figure>
        <input disabled className='message-chat-container__input' type="text" placeholder='Type a message...' />

        </div>
        <div className='prompt-chat-form__user-action prompt-send-container'>
            <img className='prompt-send-container__element' src={smile} alt="smile logo" />
            <button  className='prompt-send-container__button' type='submit'><img className='prompt-send-container__element' src={send} alt="send" /></button>
        </div>

      </form>
          </>
      }
     
    </div>
  )
}

export default ChatPanel
