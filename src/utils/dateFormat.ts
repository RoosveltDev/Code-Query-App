export const formatDate = (createdAt:string)=>{
    const date =  new Date(createdAt)
    const day=date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}