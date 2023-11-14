import axios from 'axios'
import { USER_COOKIE_ACCESS_TOKEN_KEY } from '../const/cookieFile'

import Cookies from 'js-cookie'

export const $api = axios.create({
  baseURL: __API__
})

$api.interceptors.request.use(async (request) => {
  const accessToken = Cookies.get(USER_COOKIE_ACCESS_TOKEN_KEY)

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}` || ''
  }
  return request
})

// $api.interceptors.response.use(
//   (config) => {
//     return config
//   },
//   async (err) => {
//     const originalRequest = err.config

//     if (
//       err.response?.data?.code === 401 &&
//       Cookies.get(USER_COOKIE_ACCESS_TOKEN_KEY) &&
//       Cookies.get(USER_COOKIE_REFRESH_TOKEN_KEY) &&
//       err.config &&
//       !err.config._isRetry
//     ) {
//       try {
//         originalRequest._isRetry = true
//         const { data } = await axios.post(`${__API__}/auth/refresh`, {
//           refreshToken: Cookies.get('vb-refresh-token')
//         })

//         Cookies.set('vb-access-token', data.apiData)
//         return $api.request(originalRequest)
//       } catch (err) {
//         console.log(err)
//         Cookies.remove('vb-refresh-token')
//         Cookies.remove('vb-access-token')
//         window.location.assign('/login')
//       }
//     }
//     throw err
//   }
// )
