import { memo } from 'react'
import LoginForm from '../../../features/AuthByUsername/ui/LoginForm/LoginForm'
import { Page } from '../../../widgets/Page'

const LoginPage = memo(() => {
  return (
    <Page className="centered">
      <LoginForm />
    </Page>
  )
})

export default LoginPage
