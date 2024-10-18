import { NavigateFunction } from "react-router-dom"
import makeRequest from "../../../services/api.service"


export const handleClickAccept=async (token:string,controllerRef:React.MutableRefObject<AbortController | null>,navigate:NavigateFunction)=>{
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    const response = await makeRequest(signal,'classrooms/student/confirm',"PATCH",{token},true)
    if(response.status===204) navigate("/classroom")
}