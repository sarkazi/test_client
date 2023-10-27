import { type RouteObject } from 'react-router-dom'

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about'
}

export const getRouteMain = (): string => '/'
export const getRouteAbout = (): string => '/about'

export const AppRouteByPathPattern: RouteObject = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT
}
