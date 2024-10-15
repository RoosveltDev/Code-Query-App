import makeRequest from "../../../services/api.service"
import { FetchedClassroomsType } from "../../../types/classroom/fetchedClassrooms"

export const handleClickMore=async (controllerRef: React.MutableRefObject<AbortController | null>,setData:React.Dispatch<React.SetStateAction<FetchedClassroomsType[] | null>>)=>{
    controllerRef.current =  new AbortController()
    const signal = controllerRef.current?.signal
    const response =await makeRequest(signal,'classrooms','GET',{},true)
    setData(prev=>{
        if(prev) return [...prev,...response.results]
        
        else return response.results
    })
}
