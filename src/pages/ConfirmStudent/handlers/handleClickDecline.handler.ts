import { NavigateFunction } from "react-router-dom"
import makeRequest from "../../../services/api.service"

export const handleClickDecline=async (controllerRef:React.MutableRefObject<AbortController | null>,navigate:NavigateFunction,classroomId:string,user_id:string)=>{
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    const response = await makeRequest(signal,`classrooms/${classroomId}/student/${user_id}`,"DELETE",{},true)
    if(response.status===200) navigate("/dashboard")
}