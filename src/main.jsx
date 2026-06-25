import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import posthog from 'posthog-js'
import App from './App'
import './index.css'

posthog.init('phc_mP9A69oTh2rYv5BSWcVCZme7DPwu9SRzPtSvHyNazZU2', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: false,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
