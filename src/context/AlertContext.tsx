import { createContext,ReactNode,useState } from "react";
import { AlertContextType } from "../types/alert.type";

export const AlertContext=createContext<AlertContextType|undefined>(undefined)

export const AlertContextApp=({children}:{children:ReactNode})=>{
   
    const [toast,setToast]=useState({visibility:false,message:'',type:''})
    function showToast(message = "",type = "Error"){
        setToast({visibility:true,message:message,type:type})
    }
    function hideToast(){
        setToast({visibility:false,message:'',type: 'Error' })
    }
    return(
        <AlertContext.Provider value={{showToast,hideToast,toast}}>
            {children}
        </AlertContext.Provider>
    )
}