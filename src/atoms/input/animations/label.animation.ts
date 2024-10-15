



export function invalidEffect(index:number,type:string,textError:string = 'Please review your data'){
    const label: NodeListOf<HTMLElement> = document.querySelectorAll('.label-email')
    const errorText: NodeListOf<HTMLElement> = document.querySelectorAll('.text-error')
    const errorIcon: NodeListOf<HTMLElement> = document.querySelectorAll('.material-symbols-outlined')
   
    if(label[index].classList.contains('invalid')){
        label[index].classList.remove('invalid')
        void label[index].offsetWidth
        label[index].classList.add('invalid')
    } else label[index].classList.add('invalid')
    if(type!== 'password'){
        errorIcon[index].style.display='block'
    }
    errorText[index].textContent = textError
    errorText[index].style.display='flex'
}



export const labelAnimation = (e:React.ChangeEvent<HTMLInputElement>,index:number,type:string)=>{
    const label: NodeListOf<HTMLElement> = document.querySelectorAll('.label-email');
    const errorText: NodeListOf<HTMLElement> = document.querySelectorAll('.text-error');
    const errorIcon: NodeListOf<HTMLElement> = document.querySelectorAll('.material-symbols-outlined');
    if (!e.target.validity.valid) {
      invalidEffect(index,type)  
    }else {
        label[index].classList.remove('invalid')
        if(type!== 'password'){
            errorIcon[index].style.display='none'
            errorText[index].style.display='none'
        }
        
    }    
    if(e.target.value!=''){
        e.currentTarget.classList.add('animation-input')
    }else  e.currentTarget.classList.remove('animation-input')
}
