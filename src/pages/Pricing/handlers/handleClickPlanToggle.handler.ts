export const handleClickPlanToggle = (setIsYearly: React.Dispatch<React.SetStateAction<boolean>>,isYearly:boolean)=>{
    const slider = document.querySelector('.pricing-actions-container__chip') as HTMLDivElement
    if(!isYearly) slider.style.transform = 'translateX(110px)'
    else slider.style.transform = 'translateX(0px)'
    setIsYearly((prev)=>{
        return !prev
    })
}