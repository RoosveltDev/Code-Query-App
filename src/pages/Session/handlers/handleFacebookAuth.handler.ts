import { config } from "../../../config"


export const handlerFacebook=async ()=>{
    window.location.href=`${config.SERVER_URL}/auth/facebook`
}