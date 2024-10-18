
import { createContext,ReactNode,useState } from "react"
import { UserContextType, UserLoggedStorage } from "../types/user.type"

export const UserContext = createContext<undefined|UserContextType >(undefined)
export const UserProvider = ({children}:{children:ReactNode}) => {
    const userItem = localStorage.getItem('user')
    const [user,setUser]=useState(userItem ? JSON.parse(userItem): undefined)
    
    function storeUser(dataUser:UserLoggedStorage){
        localStorage.setItem('user',JSON.stringify(dataUser))
        setUser(dataUser)
    }
    function removeUser(){ 
        localStorage.removeItem('user')
        setUser(undefined)
    }
   return (
     <UserContext.Provider value={{user,storeUser,removeUser}}>
        {children}
     </UserContext.Provider>
    )
}


