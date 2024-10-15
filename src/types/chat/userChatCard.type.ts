import { fetchedChatList } from "./fetchedChatList.type";

export type UserChatCardType = {
    isOnline?:boolean
    isChatStatus?: boolean;
    handleClickUserCard?: (e:React.MouseEvent<HTMLDivElement>) => void;
    elementCard: fetchedChatList
    text:string
}
