import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppearanceProvider } from './context/AppearanceProvider.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppearanceProvider>
        <App />
      </AppearanceProvider>
    </AuthProvider>
  </StrictMode>,
)
