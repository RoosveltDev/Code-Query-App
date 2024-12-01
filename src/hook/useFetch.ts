import { useEffect, useRef, useState } from "react"
import { FetchType } from "../types/fetch.type"
import makeRequest from "../services/api.service"
import useUser from "./useUser"
import { handleStatus } from "../utils/handleStatus"
import { useNavigate } from "react-router-dom"
import useAlert from "./useAlert"


const useFetch = <T,>({fetchOptions}:FetchType):[T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
    const [data,setData] = useState< T | null>(null) 
    const {showToast} = useAlert()
    const {removeUser} = useUser()
    const navigator = useNavigate()
    const controllerRef = useRef<AbortController|null>(null)

   async function requestServer(){
    try{
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const {context,method,data,hasCredentials,bodyFormat} =fetchOptions
        const {results,status} = await makeRequest(signal,context,method,data,hasCredentials,bodyFormat)
        if(!handleStatus(status,navigator,removeUser,showToast)) throw Error(`Fetch Error : ${status}`)
        setData(results.results ? results.results:results)

    }
    catch(error){
        const errorRequest = error as {name:string}
        if (errorRequest.name !== "AbortError") navigator("/error")
    }

      
   }
   useEffect(()=>{
     
     requestServer()
     return ()=>{
       
        controllerRef.current?.abort()
     }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   
   return [data,setData]
}

export default useFetch
