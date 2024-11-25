import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import './Success.css'

export default function Success() {
  return (
    <div className="success-container">
      <FaCheckCircle className="success-icon" />
      <h1 className="success-title">Operation Successful!</h1>
      <p className="success-message">Your action has been completed successfully.</p>
      <Link to="/" className="success-link">Return to Home Page</Link>
    </div>
  )
}