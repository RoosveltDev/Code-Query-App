export const handleSelectDashboard=(e:React.SyntheticEvent<HTMLSelectElement, Event>,setIndexSelected:React.Dispatch<React.SetStateAction<number>>)=>{
    setIndexSelected(Number(e.currentTarget.value))
}