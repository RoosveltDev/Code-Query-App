import { UserLogged } from "../user.type";

export type fetchedQuestions ={
    id:number;
    title:string,
    body:string;
    status:string;
    image?:string;
    created_at:string;
    user:Omit<UserLogged, 'email'>;
}

