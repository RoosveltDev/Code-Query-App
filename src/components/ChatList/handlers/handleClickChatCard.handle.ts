import { Dispatch, SetStateAction } from "react";
export const handleClickChatMobile=(setIsClicked:Dispatch<SetStateAction<boolean>>,setIsMobile:Dispatch<SetStateAction<boolean>>,setIndexChatClicked:Dispatch<SetStateAction<number>>,e:React.MouseEvent<HTMLDivElement>)=>{
    const currentTarget = e.currentTarget as HTMLDivElement
    setIsClicked(true)
    setIsMobile(false)
    const index = findIndexElement(currentTarget)
    setIndexChatClicked(index)
}
export const handleClickChat=(setIndexChatClicked:Dispatch<SetStateAction<number>>,e:React.MouseEvent<HTMLDivElement>)=>{
    const currentTarget = e.currentTarget as HTMLDivElement
    const index = findIndexElement(currentTarget)
    setIndexChatClicked(index)

}
const findIndexElement = (currentTarget:HTMLDivElement):number=>{
    const userChatListCard = document.querySelectorAll('.user-chat-card-container')
    let index= 0
    for (const element of userChatListCard) {

        if(element === currentTarget) {
            return index
        }
        index++
    }
    return 0
}
export const handleClickChatMobileCurrying = (setIsClicked:Dispatch<SetStateAction<boolean>>,setIsMobile:Dispatch<SetStateAction<boolean>>,setIndexChatClicked:Dispatch<SetStateAction<number>>)=>{
    return (e:React.MouseEvent<HTMLDivElement>)=>{
        handleClickChatMobile(setIsClicked,setIsMobile,setIndexChatClicked,e)
    }
}
export const handleClickChatCurrying = (setIndexChatClicked:Dispatch<SetStateAction<number>>)=>{
    return (e:React.MouseEvent<HTMLDivElement>)=>{
        handleClickChat(setIndexChatClicked,e)
    }
}