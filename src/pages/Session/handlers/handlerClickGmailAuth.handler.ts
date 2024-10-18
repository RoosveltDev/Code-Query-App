import { config } from "../../../config"

export const handlerClickGmail=()=>{
     window.location.href=`${config.SERVER_URL}/auth/gmail`
}