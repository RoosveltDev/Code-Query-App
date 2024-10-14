

export const handleCreateChat = (setIsCreatedChat:React.Dispatch<React.SetStateAction<boolean>>)=>{
    setIsCreatedChat((prev)=>{
        return !prev
    })
}
