import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";


const useResize = (setIsClicked:React.Dispatch<React.SetStateAction<boolean>>):[boolean,  RefObject<HTMLDivElement>,Dispatch<SetStateAction<boolean>>] => {
    const [isMobile,setIsMobile] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null);
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return [isMobile,containerRef,setIsMobile]
  
}

export default useResize
