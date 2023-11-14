// import { Suspense, type FC } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import { MainPage, LoginPage } from '../../../../pages/index'
// import FeedbackPage from '../../../../pages/FeedbackPage/ui/FeedbackPage'

// export const AppRouter: FC = () => {
//   return (
//     <Suspense fallback={<div>loading...</div>}>
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<MainPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/feedback" element={<FeedbackPage />} />
//         </Routes>
//       </div>
//     </Suspense>
//   )
// }

import { memo, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RequireAuth } from './RequireAuth'
import { routeConfig } from '../config/routeConfig'
import { AppRoutesProps } from '../../../../shared/types/router'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<div>...loading</div>}>{route.element}</Suspense>
    )

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    )
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}

export default memo(AppRouter)
