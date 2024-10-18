export type User ={
    id:number
    name: string;
    last_name:string;
    email:string;
    password:string;
    rol_id:number
    avatar?:string
}
export type UserLogin = Omit<User, 'rol_id'| 'last_name' | 'name' | 'id'| 'avatar'>;
export type UserLoggedStorage = UserLogged & { accessToken: string,refreshToken:string };
export type UserLogged = Omit<User, 'password'>;
export type FetchedStudent = {
    user: Student;
    status:string;
}
export type Student = {
    id:string
    name: string;
    last_name:string;
    email:string;
    avatar?:string;
    created_at:string
    
}
export type UserContextType = {
    storeUser: (dataUser:UserLoggedStorage)=>void;
    removeUser:()=>void;
    user:UserLogged

}