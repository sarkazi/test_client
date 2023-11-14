import { useContext } from 'react'
import { Input, Button, notification } from 'antd'
import styles from './LoginForm.module.scss'
import { FormEvent, memo, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { $api } from '../../../../shared/api/api'

import Cookie from 'js-cookie'
import {
  USER_COOKIE_ACCESS_TOKEN_KEY,
  USER_COOKIE_REFRESH_TOKEN_KEY
} from '../../../../shared/const/cookieFile'
import { UserContext } from '../../../../shared/lib/context/AuthContextt'

const LoginForm = memo(() => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [api, contextHolder] = notification.useNotification()

  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const onLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        const { data } = await $api.post('/auth/login', {
          email,
          password
        })

        if (data.status === 'success') {
          Cookie.set(USER_COOKIE_ACCESS_TOKEN_KEY, data.apiData.accessToken)
          Cookie.set(USER_COOKIE_REFRESH_TOKEN_KEY, data.apiData.refreshToken)
          navigate('/')
          setUser(data.apiData)
        } else {
          api.warning({ message: data.message })
        }
      } catch (err) {
        console.log(err)

        api.error({
          message: err?.response?.data?.message
            ? err?.response?.data?.message
            : 'Server-side error'
        })
      }
    },
    [password, email]
  )

  return (
    <form onSubmit={onLogin} className={styles.form}>
      <Input
        value={email}
        onChange={(event) => setEmail(event?.target.value)}
        name="email"
        placeholder="Enter email"
      />
      <Input.Password
        value={password}
        onChange={(event) => setPassword(event?.target.value)}
        name="password"
        placeholder="Enter password"
      />
      <Button color="" className={styles.btn} htmlType="submit">
        Login
      </Button>
    </form>
  )
})

export default LoginForm
