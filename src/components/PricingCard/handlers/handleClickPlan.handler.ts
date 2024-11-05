import { NavigateFunction } from "react-router-dom"
import makeRequest from "../../../services/api.service"


export const handleClickPlan =async (name:string,controllerRef:React.MutableRefObject<AbortController | null>,navigator:NavigateFunction)=>{
    if(name==="Free") navigator('/dashboard')
    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    const response = await makeRequest(signal,'payments/checkout','POST',{name},true)
    if(response.status === 201) window.location.href = response.results.url
}