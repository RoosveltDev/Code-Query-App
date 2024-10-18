import { ReactElement } from 'react'
import './layout.css'

const Layout = ({children}:{children:ReactElement}) => {
  return (
    <div className='layout-container'>
       {children}
    </div>
  )
}

export default Layout
