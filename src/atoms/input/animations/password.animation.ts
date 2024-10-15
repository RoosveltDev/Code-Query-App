

export const passwordEyeClicked = (e:React.MouseEvent<SVGSVGElement>)=>{
    const parent = e.currentTarget.parentNode as HTMLElement
    const activeIcon = parent.querySelector('.input_containar__password--active') as HTMLElement
    const disableIcon = parent.querySelector('.input_containar__password--disable') as HTMLElement
    const input = parent.querySelector('.input-container__input') as HTMLElement
    if(input.getAttribute('type')==='password'){
         disableIcon.style.display = 'block'
        activeIcon.style.display='none'
        input.setAttribute('type','text')
    }
    else{
        disableIcon.style.display = 'none'
        activeIcon.style.display='block'
        input.setAttribute('type','password')
    }   
   
    
}
