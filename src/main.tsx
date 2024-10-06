import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/router'
import { UserProvider } from './context/UserContext'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
     <Router></Router>
    </UserProvider>
  </StrictMode>,
)
