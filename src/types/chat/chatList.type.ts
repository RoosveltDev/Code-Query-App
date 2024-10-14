import { Dispatch, SetStateAction } from "react";
import { fetchedChatList } from "./fetchedChatList.type";

export type chatListType ={
    isMobile:boolean;
    setIsClicked:Dispatch<SetStateAction<boolean>>;
    setIsMobile:Dispatch<SetStateAction<boolean>>;
    setData:Dispatch<SetStateAction<fetchedChatList[] | null>>
    setIndexChatClicked:Dispatch<SetStateAction<number>>;
    data: fetchedChatList[] | null;

}