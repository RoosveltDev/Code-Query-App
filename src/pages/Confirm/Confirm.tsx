
import { Link } from "react-router-dom"
import logo from '../../assets/bg.svg'
import thumbs from '../../assets/thumbs up.svg'
import ilustration from '../../assets/Illustration.svg'
import "./confirm.css"
const Confirm = () => {
  return (
    <div className='main-recover'>
    <div className='main-recover__container recover-container confirm-container-main'>
      <figure className="confirm-container">
          <img className='confirm-container__image' src={logo} alt="Logo" />
          <img className='confirm-container__imageThumbs' src={thumbs} alt="Logo" />
          <img className='confirm-container__imageIlustration' src={ilustration} alt="Logo" />
      </figure>
       
        <p>Your account successfully created.</p>
        <Link className="btn-submit"  to={"login"}>Go to Home</Link>
    </div>
    
  </div>
  )
}

export default Confirm
