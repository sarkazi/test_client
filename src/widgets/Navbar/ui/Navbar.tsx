import { memo, useContext } from 'react'

import { Button, Flex, Layout } from 'antd'
import { Link } from 'react-router-dom'

import Cookie from 'js-cookie'

import { useNavigate, useLocation } from 'react-router-dom'

import styles from './Navbar.module.scss'
import {
  USER_COOKIE_ACCESS_TOKEN_KEY,
  USER_COOKIE_REFRESH_TOKEN_KEY
} from '../../../shared/const/cookieFile'
import { UserContext } from '../../../shared/lib/context/AuthContextt'

const { Header } = Layout

export const Navbar = memo(() => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user, setUser } = useContext(UserContext)

  const onLogout = () => {
    Cookie.remove(USER_COOKIE_ACCESS_TOKEN_KEY)
    Cookie.remove(USER_COOKIE_REFRESH_TOKEN_KEY)
    navigate('/login')
    setUser(null)
  }

  return (
    <Header className={styles.header}>
      <Flex
        justify="space-between"
        align="center"
        gap="10px"
        className="widthFull"
      >
        <Flex align="center" gap="30px">
          <Link className={styles.logo} to="/" />
          {user && <Link to="review">Список отзывов</Link>}
        </Flex>

        {!pathname.includes('login') &&
          (!user ? (
            <Button onClick={() => navigate('/login')}>Войти</Button>
          ) : (
            <Button onClick={onLogout}>Выйти</Button>
          ))}
      </Flex>
    </Header>
  )
})
