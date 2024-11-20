import { useEffect, useRef, useState } from "react"
import { FetchType } from "../types/fetch.type"
import makeRequest from "../services/api.service"


const useFetch = <T,>({fetchOptions}:FetchType):[T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
    const [data,setData] = useState< T | null>(null) 
    const controllerRef = useRef<AbortController|null>(null)

   async function requestServer(){
    try{
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const {context,method,data,hasCredentials,bodyFormat} =fetchOptions
        const {results,status} = await makeRequest(signal,context,method,data,hasCredentials,bodyFormat)
        console.log(status)
        setData(results.results ? results.results:results)
    }
    catch(error){
        console.log("Error from useFetch"+ error)
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
