import Form from "../../components/Form/Form"
import logo from "../../assets/Logo.svg"
import { Link, useLocation } from 'react-router-dom'
import fbLogo from '../../assets/facebook.svg'
import googleLogo from '../../assets/gmail.svg'
import './session.css'
import backgroundLogin from '../../assets/login.svg'
import backgroundSignUp from '../../assets/signup.svg'
import {  handleLoginCurrying, handleRegisterCurrying} from "./handlers/handleSubitSession.handler"
import { handleClickToggle } from "./handlers/handleClickToogle.handler"
import {useState } from "react"
import useUser from "../../hook/useUser"
import { handlerFacebook } from "./handlers/handleFacebookAuth.handler"
const Session = () => {
  const {storeUser} = useUser()
  const [toggleState,setToggleState] = useState(false)
  const signUpText= !toggleState? "Sign Up Student":"Sign Up Teacher"  
  const location=useLocation()
  const isLogin = location.pathname ==='/login'
  const formProps = isLogin ? [{type:"email",label:"Email"},{type:"password",label:"password"}] 
  : [{type:"text",label:"Full Name"},{type:"email",label:"Email"},{type:"password",label:"Password"},{type:"password",label:"Confirm"}]
  
  return (
    <div className="main-container-login">
         <div className="login-container">
            <img className="login-container__image" src={logo} alt="Logo" />
            <div className="aside-container-login">
                <h1 className="login-container__header">{isLogin?"Log In":signUpText}</h1>  
                { !isLogin? <div className="aside-container-login__toggle toggle_login">
                    <div onClick={(e)=>handleClickToggle(e,setToggleState)} className="toggle_login__circle circle-toggle-login">
                    <svg className="circle-toggle-login__svg--inactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/></svg>
                    <svg className="circle-toggle-login__svg--active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"/></svg>
                    </div>
                </div> : <></>
                }       
            </div>
            <div className="login-container__social social-container">
                <button className="social-container__google social-element">
                  <img className="social-element__logo" src={googleLogo} alt="gmail" />
                  <p className="social-element__text">Google</p>
                </button>
                <button onClick={handlerFacebook} className="social-container__facebook social-element">
                <img className="social-element__logo" src={fbLogo} alt="fb" />
                <p className="social-element__text">Facebook</p>
                </button>
            </div>
            <div className="login-container__divider divider">
                <span className="divider__or">Or</span>
            </div>
            <Form submit={isLogin? handleLoginCurrying(storeUser):handleRegisterCurrying(toggleState?0:1)}  inputs={formProps} buttonText={isLogin?"Log In":"Sign Up"}>
              {
                isLogin
                ? <div className="form-container__options options-recover">
                <div className="options-recover__remember remember-container">

                  <input className="remember-container__input"  type="checkbox" name="remember" />
                  <p className="remember-container__text">Remember Me</p>
                </div>
                <Link to="/recover" className="options-recover__forgot">Forgot Password?</Link>
              
              </div>
              : <div className="options-recover__remember remember-container">
                <input className="remember-container__input"  type="checkbox" name="remember" />
                <p>By creating an account you agree to the <span className="remember-container__span">terms of use</span > and our <span className="remember-container__span">privacy policy.</span></p>
              </div>
              }
              
            </Form> 
            {isLogin? <p className="login-container__footer session-footer ">Don't have an account yet?<span><Link className="session-footer__link" to={"/register"}>New Account</Link></span></p>
            : <p className="login-container__footer session-footer ">Already have an account yet?<span><Link className="session-footer__link" to={"/login"}>Log In</Link></span></p>}
        </div>
        <img className="main-container-login__background" src={isLogin?backgroundLogin:backgroundSignUp} alt="Background" />
    
    </div>
  )
}

export default Session
