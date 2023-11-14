import {
  AppRoutes,
  getRouteLogin,
  getRouteMain,
  getRouteReview
} from '../../../../shared/const/router'
import { AppRoutesProps } from '../../../../shared/types/router'
import { ReviewsPage, LoginPage, MainPage } from '../../../../pages'

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true
  },
  [AppRoutes.AUTH]: {
    path: getRouteLogin(),
    element: <LoginPage />,
    authOnly: false
  },
  [AppRoutes.REVIEW]: {
    path: getRouteReview(),
    element: <ReviewsPage />,
    authOnly: true
  }
}
