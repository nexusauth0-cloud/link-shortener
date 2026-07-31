import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

window.onerror = (_msg, _url, _line, _col, error) => {
  console.error('Global error:', error)
}

window.onunhandledrejection = (event) => {
  console.error('Unhandled rejection:', event.reason)
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
