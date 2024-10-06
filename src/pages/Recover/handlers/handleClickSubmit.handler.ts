import { NavigateFunction } from "react-router-dom"
import makeRequest from "../../../services/api.service"
import sanitizeInput from "../../../utils/sanitize"

export const handleSubmitRecover = async (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate:NavigateFunction)=>{
    e.preventDefault()
    const input = document.querySelector('.input-container__input') as HTMLInputElement
    const email = sanitizeInput(input.value.trim())
    const signal = controlSignal.signal
    await makeRequest(signal,"auth/reset_password","POST",{email},false)
    //TODO Handle Resposne
    navigate('/login')
}