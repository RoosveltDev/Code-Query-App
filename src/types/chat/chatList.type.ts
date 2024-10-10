import { Dispatch, SetStateAction } from "react";

export type chatListType ={
    isMobile:boolean;
    setIsClicked:Dispatch<SetStateAction<boolean>>;
    setIsMobile:Dispatch<SetStateAction<boolean>>
}