export type LiveCodingPanelType = {
    running:boolean;
    setIsRunning:React.Dispatch<React.SetStateAction<boolean>>
    questionId:string
    answerId?:string
}