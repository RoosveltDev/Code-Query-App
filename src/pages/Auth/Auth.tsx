import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useUser from "../../hook/useUser"
const Auth = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const accessToken = queryParams.get('accessToken') as string
    const refreshToken = queryParams.get('refreshToken') as string
    const email = queryParams.get('email') as string
    const name = queryParams.get('name') as string
    const last_name = queryParams.get('last_name') as string
    const avatar = queryParams.get('avatar') as string
    const id = Number(queryParams.get('id') as string)
    const rol_id = Number(queryParams.get('rol_id') as string)
    const {storeUser} = useUser()
  useEffect(()=>{
    if(accessToken && refreshToken && email && id){
        storeUser({accessToken,id,email,last_name,refreshToken,avatar,rol_id,name})
        navigate('/dashboard')
    }
    else navigate('/error')
   
  },[])
  return null
}

export default Auth
