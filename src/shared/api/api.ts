import axios from 'axios'
import {
  USER_COOKIE_ACCESS_TOKEN_KEY,
  USER_COOKIE_REFRESH_TOKEN_KEY
} from '../const/cookieFile'

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
