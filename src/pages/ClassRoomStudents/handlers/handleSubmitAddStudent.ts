import makeRequest from "../../../services/api.service"
import { FetchedStudent } from "../../../types/user.type"
import sanitizeInput from "../../../utils/sanitize"


export const handleSubmiAddStudent = async (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController,setData:React.Dispatch<React.SetStateAction<FetchedStudent[]| null>>,classroom_id:string)=>{
    e.preventDefault()
    const signal = controlSignal.signal
    const input =document.querySelector('.input-container__input') as HTMLInputElement
    const email = sanitizeInput(input.value.trim())
    const {status,results} = await makeRequest(signal,`classrooms/${classroom_id}/students`,"POST",{email},true)
    console.log(results)
    if(status===201) {
        setData((prev)=>{
            if (prev) return [...prev, {status:"PENDING",user:results}]
            else return [{status:"PENDING",user:results}]
        })
    }
}
export const handleSubmiAddStudentCurrying=(setData:React.Dispatch<React.SetStateAction<FetchedStudent[] | null>>,classroom_id:string)=>{
    return (e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController)=>{
        return handleSubmiAddStudent(e,controlSignal,setData,classroom_id)
    }
}