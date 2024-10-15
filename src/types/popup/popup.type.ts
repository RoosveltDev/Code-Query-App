import { FormElement } from "../form.type"

export type PopUpType = {
    inputs:FormElement[]
    submit:(e:React.FormEvent<HTMLFormElement>,controlSignal:AbortController)=>void;
    setIsCreatedChat:React.Dispatch<React.SetStateAction<boolean>>
}