import { Dispatch, SetStateAction } from "react"

export const handleClickToggle=(e:React.MouseEvent,setToggle:Dispatch<SetStateAction<boolean>>)=>{
    const target = e.currentTarget as HTMLElement
    target.classList.toggle('toggle_login__circle--active')
    setToggle((prev)=>{
        return !prev
    })
    const svgInactive = target.querySelector('.circle-toggle-login__svg--inactive') as HTMLElement
    const svgActive = target.querySelector('.circle-toggle-login__svg--active') as HTMLElement
    if(target.classList.contains('toggle_login__circle--active')){
        svgInactive.style.display = 'block'
        svgActive.style.display = 'none'
    } else{
         svgInactive.style.display = 'none'
        svgActive.style.display = 'block'
    }
    
}