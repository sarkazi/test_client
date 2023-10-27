import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider'
import './app/config/i18n/i18n'

import './app/styles/common.scss'

const rootElement = document.getElementById('app')

if (rootElement === null) {
  throw new Error('Error while initializing the application')
}

createRoot(rootElement).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
