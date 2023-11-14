import { Navigate, useLocation } from 'react-router-dom'
import { getRouteLogin } from '../../../../shared/const/router'
import Cookie from 'js-cookie'
import { USER_COOKIE_ACCESS_TOKEN_KEY } from '../../../../shared/const/cookieFile'

interface RequireAuthProps {
  children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = Cookie.get(USER_COOKIE_ACCESS_TOKEN_KEY)

  const location = useLocation()

  if (!auth) {
    return <Navigate to={getRouteLogin()} state={{ from: location }} replace />
  }

  return children
}
