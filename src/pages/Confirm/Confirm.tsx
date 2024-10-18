
import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/bg.svg'
import thumbs from '../../assets/thumbs up.svg'
import ilustration from '../../assets/Illustration.svg'
import "./confirm.css"
import { useEffect } from "react"
import makeRequest from "../../services/api.service"
import { useLocation } from 'react-router-dom';
const Confirm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const email = queryParams.get('email') as string
  const token = queryParams.get('token') as string
 
  useEffect(()=>{
    if(!email || !token) {navigate('/login')}
    const controller = new AbortController()
    makeRequest(controller.signal,"auth/confirm","PATCH",{email,token},false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className='main-recover'>
    <div className='main-recover__container recover-container confirm-container-main'>
      <figure className="confirm-container">
          <img className='confirm-container__image' src={logo} alt="Logo" />
          <img className='confirm-container__imageThumbs' src={thumbs} alt="Logo" />
          <img className='confirm-container__imageIlustration' src={ilustration} alt="Logo" />
      </figure>
       
        <p>Your account successfully created.</p>
        <Link className="btn-submit confirm-container-main__link"  to={"login"}>Go to Login</Link>
    </div>
    
  </div>
  )
}

export default Confirm
