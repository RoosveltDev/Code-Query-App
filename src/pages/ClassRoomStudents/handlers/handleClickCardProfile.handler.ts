import {  Student } from "../../../types/user.type"

export const handleClickCardProfile=(user:Student,setUserClicked:React.Dispatch<React.SetStateAction<Student | null>>)=>{
    setUserClicked(user)
}
export const handleClickCardProfileMobile=(user:Student,setUserClicked:React.Dispatch<React.SetStateAction<Student | null>>,setIsClickedInformation:React.Dispatch<React.SetStateAction<boolean>>)=>{
    setUserClicked(user)
    setIsClickedInformation(true)
}