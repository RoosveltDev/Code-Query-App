import { ReactElement } from 'react'
import './layout.css'
import Header from '../components/Menu/header'
import { useLocation } from 'react-router-dom'

const Layout = ({children}:{children:ReactElement}) => {
  const location = useLocation()
  const isSession = location.pathname === "/login" || location.pathname === "/register"
  return (
    <div className='layout-container'>
       {!isSession && <Header/>}
       {children}
    </div>
  )
}

export default Layout
