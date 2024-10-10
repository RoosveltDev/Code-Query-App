import ChatList from "../../components/ChatList/ChatList"
import './chat.css'
import ChatPanel from "../../components/ChatPanel/ChatPanel"
import { useRef,useEffect, useState } from "react"

const Chat = () => {
  const containerRef = useRef(null);
  const [isMobile,setIsMobile] = useState<boolean>(false)
  const [isClicked,setIsClicked] = useState<boolean>(false)
  useEffect(() => {
    const container = containerRef.current;
    const handleResize = (entries:ResizeObserverEntry[]) => {
       const sizeContainer = entries[0].contentRect.width
       if(sizeContainer < 707 && isMobile === false) {
          setIsMobile(true)
       }
       if(sizeContainer > 706) {
          setIsClicked(false)
          setIsMobile(false)
     }
    }
    const resizeObserver = new ResizeObserver(handleResize)
    if (container) {
      resizeObserver.observe(container)
    }
    return () => {
      if (container) {
        resizeObserver.unobserve(container)
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
        <div ref={containerRef} className="container-main-chat">
           { !isClicked &&
              <div className="container-main-chat__list">
              <ChatList isMobile={isMobile} setIsMobile={setIsMobile} setIsClicked = {setIsClicked}></ChatList>
             </div>
           }
          
            {
              (!isMobile || (isClicked && isMobile) ) && <div className="container-main-chat__panel">
              <ChatPanel></ChatPanel>
            </div>
            }
            
        </div>
  )
}

export default Chat
