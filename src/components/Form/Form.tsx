
import './form.css'
import Input from '../../atoms/input/Input'
import { FormElement, FormType } from '../../types/form.type'
import Button from '../../atoms/button/Button'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../hook/useAlert'
import useUser from '../../hook/useUser'

const Form = ({children,inputs,submit,buttonText}:FormType) => {
  const controllerSignalRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();
  const {showToast} = useAlert()
  const {removeUser} = useUser()
  
  useEffect(()=>{
    controllerSignalRef.current = new AbortController();
    return ()=>{
      controllerSignalRef.current?.abort()
    }
    
  },[])
  return (
    <form onSubmit={(e)=>submit(e,controllerSignalRef.current as AbortController,navigate,showToast,removeUser)} className="login_container__form form-container" noValidate>
        {inputs.map((element:FormElement,index:number)=> <Input key={`form-${index}`} inputElement={element} index={index}></Input>)}
        {children}
        <Button buttonText={buttonText} type='submit'></Button>
    </form>
  )
}

export default Form
