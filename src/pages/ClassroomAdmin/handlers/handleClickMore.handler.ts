import makeRequest from "../../../services/api.service"
import { FetchedClassroomsAdmin } from "../../../types/classroom/fetchedClassroomsAdmin"

export const handleClickMore=async (controllerRef: React.MutableRefObject<AbortController | null>,setData:React.Dispatch<React.SetStateAction<FetchedClassroomsAdmin[] | null>>,length:number)=>{
    controllerRef.current =  new AbortController()
    const signal = controllerRef.current?.signal
    const response =await makeRequest(signal,`classrooms?page=${2}&per_page=${length}`,'GET',{},true)
    setData(prev=>{
        if(prev) return [...prev,...response.results.results]
        
        else return response.results
    })
}
