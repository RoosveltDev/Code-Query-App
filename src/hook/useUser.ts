import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { UserContextType } from "../types/user.type"

const useUser = () => {
    
    const context = useContext(UserContext) as UserContextType
    return context
}

export default useUser
