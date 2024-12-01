import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/router'
import { UserProvider } from './context/UserContext'
import { AlertContextApp } from './context/AlertContext'
import Toast from './components/Toast/Toast'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
    <AlertContextApp>
    <Toast></Toast>
     <Router></Router>
     </AlertContextApp>
    </UserProvider>
  </StrictMode>,
)
