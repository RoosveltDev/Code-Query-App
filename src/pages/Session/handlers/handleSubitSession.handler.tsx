import sanitizeInput from "../../../utils/sanitize"
import { validateInputs ,validatePassword} from "../../../utils/validateInputs"
import { userSchema } from "../../../schemas/users.schemas"
import { User,UserLogged,UserLogin } from "../../../types/user.type"
import { invalidEffect } from "../../../atoms/input/animations/label.animation"
import makeRequest from "../../../services/api.service"
import { NavigateFunction } from "react-router-dom"
export const handleSubmitLogin=async (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate:NavigateFunction,storeUser:(dataUser: UserLogged) => void)=>{
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
    const validatedSchema = validateInputs<User,UserLogin>( userObject,userSchema)
    if(validatedSchema) {
        const signal = controlSignal.signal
        const {results} = await makeRequest(signal,"auth/signIn","POST",userObject,false)
        /* TODO: HANDLE RESPONSE */
        results.email = email
        storeUser(results)
        navigate('/')

    }
    
}
export const handleSubmitRegister=async (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate:NavigateFunction,rolId:number)=>{
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
    const [name,lastName] = fullNameArray
    
    const userObject:User = {email,password,name,last_name:lastName,rol_id:rolId}
    const validatedSchema = validateInputs<User,UserLogin>( userObject,userSchema)
    if(validatedSchema) {
        const signal = controlSignal.signal
        await makeRequest(signal,"auth/signUp","POST",userObject,false)
        /* TODO: HANDLE RESPONSE */
        navigate('/login')
    }
    
    
}

export const handleLoginCurrying=(storeUser:(dataUser: UserLogged) => void)=>{
    return (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate:NavigateFunction)=>{
        return handleSubmitLogin(e,controlSignal,navigate,storeUser)
    }
}
export const handleRegisterCurrying=(rol_id:number)=>{
    return (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,navigate:NavigateFunction)=>{
        return handleSubmitRegister(e,controlSignal,navigate,rol_id)
    }
}