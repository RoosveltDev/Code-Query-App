import { Dispatch, SetStateAction } from "react";
export const handleClickChatMobile=(setIsClicked:Dispatch<SetStateAction<boolean>>,setIsMobile:Dispatch<SetStateAction<boolean>>)=>{
    setIsClicked(true)
    setIsMobile(false)
}
export const handleClickChat=(/* setIsClicked:Dispatch<SetStateAction<boolean>>,setIsMobile:Dispatch<SetStateAction<boolean>> */)=>{
    
}