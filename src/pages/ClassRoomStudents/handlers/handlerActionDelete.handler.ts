import makeRequest from "../../../services/api.service"
import { FetchedStudent } from "../../../types/user.type"

export const handlerActionDelete =async (controllerRef: React.MutableRefObject<AbortController | null>,classroom_id:string,student_id:string,setData:React.Dispatch<React.SetStateAction<FetchedStudent[] | null>>)=>{
    controllerRef.current = new AbortController()
    const signal=controllerRef.current.signal
    const response = await makeRequest(signal,`classrooms/${classroom_id}/student/${student_id}`,'DELETE',{},true)
    if(response.status === 200) setData(prev=> {
        if (!prev) return null; 
        return prev.filter(student => student.user.id !== student_id)
    })
}