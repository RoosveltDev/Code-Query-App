import { Navigate,Outlet } from "react-router-dom"
import useUser from "../hook/useUser"



const Public = () => {
   const {user} = useUser()
    if(user){
        return  <Navigate to="/dashboard"></Navigate>
    }
    return <Outlet></Outlet>
    
    }

export default Public
