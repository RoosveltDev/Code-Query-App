export type UserChatCardType={
    text:string;
    name:string;
    isChatStatus?:boolean;
    handleClickUserCard?:()=>void | null;
}