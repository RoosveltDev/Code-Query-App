import { useContext } from "react"
import { AlertContext } from "../context/AlertContext"
import { AlertContextType } from "../types/alert.type"
const useAlert = () => {
    const context = useContext(AlertContext) as AlertContextType
    return context
}

export default useAlert
