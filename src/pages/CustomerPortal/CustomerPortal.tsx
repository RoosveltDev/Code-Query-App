import { useEffect } from "react"
import useFetch from "../../hook/useFetch"
import { useNavigate } from "react-router-dom"


const CustomerPortal = () => {
    const navigator = useNavigate()
    const [data] = useFetch<{url:string}>({fetchOptions:{
        context: `payments/customerPortal`,
        method: "GET",
        data: {},
        hasCredentials: true,
        bodyFormat: "row" ,
      }})
    useEffect(()=>{
        if(data){
            if(data.url) window.location.href = data?.url as string
            else navigator('/dashboard')
        }
    },[data])
    return (
        <></>
    )
}

export default CustomerPortal
