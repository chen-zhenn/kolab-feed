import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  UIProvider, 
  QueryClientProvider, 
} from '@/presentation/providers/'
import { Router } from '@/routes/'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
        <Router />
    </UIProvider>
  </StrictMode>
)
