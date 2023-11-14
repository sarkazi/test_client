import { memo } from 'react'
import LoginForm from '../../../features/AuthByUsername/ui/LoginForm/LoginForm'

const LoginPage = memo(() => {
  return (
    <main>
      <LoginForm />
    </main>
  )
})

export default LoginPage
