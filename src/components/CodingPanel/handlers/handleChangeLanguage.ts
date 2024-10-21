import { LanguageType } from "../../../types/editor/editor.type"

export const handleChangeLanguage = (setLanguage:React.Dispatch<React.SetStateAction<LanguageType>>)=>{
    const inputSelected = document.querySelector('.select-coding-panel-container__languagues') as HTMLInputElement
    const language = inputSelected.value as LanguageType
    setLanguage(language)
}
