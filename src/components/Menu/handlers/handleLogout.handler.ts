import { NavigateFunction } from "react-router-dom";

export const handleLogout = (navigate:NavigateFunction,removeUser:()=>void)=>{
    removeUser()
    navigate('/login')
}