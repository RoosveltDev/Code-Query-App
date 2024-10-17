import { Navigate,Outlet } from "react-router-dom"
import useUser from "../hook/useUser"



const Private = () => {
  const {user} = useUser()
  
    if (!user){
        return  <Navigate to="/login"></Navigate>
    } 

    return <Outlet></Outlet>

 
}

export default Private
