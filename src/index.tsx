import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'

import './app/styles/common.scss'

const rootElement = document.getElementById('app')

if (rootElement === null) {
  throw new Error('Error while initializing the application')
}

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
