import { useContext } from 'react'
import { Input, Button, notification, Flex } from 'antd'
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

  const [requestEndpoint, setRequestEndpoint] = useState<
    'login' | 'register' | ''
  >('')

  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const onLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setRequestEndpoint('login')

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
          notification.warning({ message: data.message })
        }
      } catch (err) {
        console.log(err)

        notification.error({
          message: err?.response?.data?.message
            ? err?.response?.data?.message
            : 'Server-side error'
        })
      } finally {
        setRequestEndpoint('')
      }
    },
    [password, email, requestEndpoint]
  )

  const onReg = useCallback(async () => {
    try {
      setRequestEndpoint('register')
      const { data } = await $api.post('/auth/register', {
        email,
        password
      })

      if (data.status === 'success') {
        setEmail('')
        setPassword('')
        notification.success({ message: data.message })
      } else {
        notification.warning({ message: data.message })
      }
    } catch (err) {
      console.log(err)

      notification.error({
        message: err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Server-side error'
      })
    } finally {
      setRequestEndpoint('')
    }
  }, [password, email, requestEndpoint])

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
      <Flex align="center" justify="flex-start" gap="10px">
        <Button
          loading={requestEndpoint === 'login'}
          color=""
          className={styles.btn}
          htmlType="submit"
        >
          Войти
        </Button>
        <Button
          loading={requestEndpoint === 'register'}
          onClick={onReg}
          type="text"
        >
          Регистрация
        </Button>
      </Flex>
    </form>
  )
})

export default LoginForm
