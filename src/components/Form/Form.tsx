
import { ReactElement } from 'react'
import './form.css'
const Form = ({children}:{
    children:ReactElement
}) => {
  return (
    <form className="login_container__form form-container" noValidate>
        {children}
    
    </form>
  )
}

export default Form
