import { type FC, Suspense, useState, useMemo, useEffect } from 'react'
import AppRouter from './providers/router/ui/AppRouter'
import { Navbar } from '../widgets/Navbar'
import { UserContext } from '../shared/lib/context/AuthContextt'

import './styles/common.scss'
import MainLayout from '../shared/ui/MainLayout/ui/MainLayout'
import { $api } from '../shared/api/api'

const App: FC = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        let { data } = await $api.post('/auth')

        if (data.code === 200) {
          setUser(data.apiData)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <Suspense fallback={<div>loading...</div>}>
      <UserContext.Provider value={value}>
        <MainLayout header={<Navbar />} content={<AppRouter />} />
      </UserContext.Provider>
    </Suspense>
  )
}

export default App
