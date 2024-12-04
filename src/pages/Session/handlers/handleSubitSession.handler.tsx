import sanitizeInput from "../../../utils/sanitize"
import { validateInputs ,validatePassword} from "../../../utils/validateInputs"
import { userSchema } from "../../../schemas/users.schemas"
import { User,UserLoggedStorage,UserLogin } from "../../../types/user.type"
import { invalidEffect } from "../../../atoms/input/animations/label.animation"
import makeRequest from "../../../services/api.service"
import { NavigateFunction } from "react-router-dom"
import { handleStatus } from "../../../utils/handleStatus"
export const handleSubmitLogin=async (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate:NavigateFunction,showToast:(message: string, type?: string) => void,storeUser:(dataUser: UserLoggedStorage) => void)=>{
    e.preventDefault()
    const inputs = document.querySelectorAll('.input-container__input') as NodeListOf<HTMLInputElement>
    const email = sanitizeInput(inputs[0].value.trim())
    const password = sanitizeInput(inputs[1].value.trim())
    const {valid,text } = validatePassword(password)
    if (!valid) {
        invalidEffect(1,'password',text)
        return
    }
    const userObject:UserLogin = {email,password}
    const validatedSchema = validateInputs<Omit<User, 'id'>,UserLogin>( userObject,userSchema)
    if(validatedSchema) {
        const signal = controlSignal.signal
        const {results,status} = await makeRequest(signal,"auth/signIn","POST",userObject,false)
        if(status===200){
            /* TODO: HANDLE RESPONSE */
            results.email = email
            storeUser(results)
            navigate('/dashboard')
        }
        if(status===401){
            if(results.message === 'Incorret password') showToast('Review your data')
            else showToast("Please confirm your email")
        }
        if(status===404) showToast('User not found')
       

    }
    
}
export const handleSubmitRegister=async (
    e:React.FormEvent<HTMLFormElement>,
    controlSignal:AbortController,
    navigate:NavigateFunction,
    showToast:(message: string, type?: string) => void,
    removeUser:()=>void,
    rolId:number
)=>{
    e.preventDefault()
    const inputs = document.querySelectorAll('.input-container__input') as NodeListOf<HTMLInputElement>
    const email = sanitizeInput(inputs[1].value.trim())
    const password = sanitizeInput(inputs[2].value.trim())
    const confirmPassword =sanitizeInput(inputs[3].value.trim())
    const fullName =sanitizeInput(inputs[0].value.trim())
    if(password!== confirmPassword) {
        invalidEffect(3,'password',"Password doesn't match")
        return
    }
    const fullNameArray =fullName.split(" ")
    if(fullNameArray.length<2) {
        invalidEffect(0,'text',"Please write last name also")
        return
    }
    
    const {valid,text} = validatePassword(password)
    if(!valid){
        invalidEffect(2,'password',text)
        return
    }
    const [name,lastName] = fullNameArray
    const userObject:Omit<User, 'id'> = {email,password,name,last_name:lastName,rol_id:rolId}
    const validatedSchema = validateInputs<Omit<User, 'id'>,UserLogin>( userObject,userSchema)
    if(validatedSchema) {
        const signal = controlSignal.signal
        const {status} = await makeRequest(signal,"auth/signUp","POST",userObject,false)
        if(handleStatus(status,navigate,removeUser,showToast)) {
            inputs.forEach((element)=>{
                element.value = ""
            })
            navigate('/login')
        }
        else showToast("Review your data")
    }
    
    
}

export const handleLoginCurrying=(storeUser:(dataUser: UserLoggedStorage) => void)=>{
    return (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate?:NavigateFunction,showToast?:(message: string, type?: string) => void)=>{
        return handleSubmitLogin(e,controlSignal,navigate!,showToast!,storeUser)
    }
}
export const handleRegisterCurrying=(rol_id:number)=>{
    return (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate?:NavigateFunction,showToast?:(message: string, type?: string) => void,removeUser?:()=>void)=>{
        return handleSubmitRegister(e,controlSignal,navigate!,showToast!,removeUser!,rol_id)
    }
}