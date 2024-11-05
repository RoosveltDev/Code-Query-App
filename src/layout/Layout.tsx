import { ReactElement } from 'react'
import './layout.css'
import Header from '../components/Menu/header'

const Layout = ({children}:{children:ReactElement}) => {
  return (
    
    <div className='layout-container'>
      <Header/>
       {children}
    </div>
  )
}

export default Layout
