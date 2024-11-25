import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found-container">
      <img src="/src/assets/astronaut404.png" alt="Lost astronaut in space" className="not-found-image" />
      <h1 className="not-found-title">404</h1>
      <div className="not-found-message">
        <h2>Looks like you're lost in space</h2>
        <p>The page you're looking for doesn't exist or has been moved to another galaxy.</p>
      </div>
      <Link to="/" className="not-found-link">Return to Earth (Home Page)</Link>
      <div className="stars"></div>
    </div>
  )
} 