import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
import './Error.css'

export default function Error() {
  return (
    <div className="error-container">
      <FaExclamationTriangle className="error-icon" />
      <h1 className="error-title">Oops! Something went wrong</h1>
      <p className="error-message">We're sorry, an unexpected error has occurred.</p>
      <Link to="/" className="error-link">Return to Home Page</Link>
    </div>
  )
}