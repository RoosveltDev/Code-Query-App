import { fetchedChatList } from "../chat/fetchedChatList.type";


export type SearchType<T extends fetchedChatList >={
    setData: React.Dispatch<React.SetStateAction<T[] | null>>;
    data:T[];
    target:(keyof T | keyof T['user'])[]
}