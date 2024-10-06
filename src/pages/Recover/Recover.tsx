import "./recover.css"
import logo from '../../assets/Logo.svg'
import Form from '../../components/Form/Form'
import { handleSubmitRecover } from './handlers/handleClickSubmit.handler'
const Recover = () => {
  return (
    <div className='main-recover'>
      <div className='main-recover__container recover-container'>
          <img className='login-container__image' src={logo} alt="Logo" />
          <h1 className='login-container__header'>Recover</h1>
          <Form inputs={[{type:"email",label:"Email"}]} buttonText='Recover Password' submit={handleSubmitRecover}>
            <></>
          </Form>
      </div>
      
    </div>
  )
}

export default Recover
