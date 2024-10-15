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
export type UserLogged = Omit<User, 'password'>;

export type UserContextType = {
    storeUser: (dataUser:UserLogged)=>void;
    removeUser:()=>void;
    user:UserLogged

}