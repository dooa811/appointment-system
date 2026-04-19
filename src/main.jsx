import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#2D1A0E',
          color: '#F9F3E8',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          borderRadius: '8px',
        },
        success: {
          iconTheme: { primary: '#c08040', secondary: '#F9F3E8' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#F9F3E8' },
        },
      }}
    />
  </StrictMode>,
)