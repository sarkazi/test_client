import { Suspense, type FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  AboutPage,
  MainPage,
  SubmitPage,
  NotFoundPage
} from '../../../../pages/index'

export const AppRouter: FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
