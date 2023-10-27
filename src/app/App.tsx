import { type FC, Suspense } from 'react'
import { AppRouter } from './providers/router/ui/AppRouter'

import './styles/common.scss'
import Navbar from '../widgets/Navbar/ui/Navbar'

const App: FC = () => {
  return (
    <div className="mainLayout">
      <Suspense fallback={''}>
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  )
}

export default App
