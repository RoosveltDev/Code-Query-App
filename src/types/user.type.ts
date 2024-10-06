export type User ={
    name: string;
    last_name:string;
    email:string;
    password:string;
    rol_id:number
}
export type UserLogin = Omit<User, 'rol_id'| 'last_name' | 'name'>;
export type UserLogged = Omit<User, 'password'>;

export type UserContextType = {
    storeUser: (dataUser:UserLogged)=>void;
    removeUser:()=>void;
    user:UserLogged

}