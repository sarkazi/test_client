import { ReactNode, useEffect, useMemo, useState } from 'react'

import { $api } from '../../../../../shared/api/api'

import { UserContext } from '../../../../../shared/lib/context/AuthContextt'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    ;(() => {
      try {
        let { data } = await $api.post('/auth')

        if (data.code === 200) {
          setCurrentUser(data.apiData)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [currentUser])

  const defaultProps = useMemo(
    () => ({
      currentUser
    }),
    [currentUser]
  )

  return (
    <UserContext.Provider value={defaultProps}>{children}</UserContext.Provider>
  )
}

export default AuthProvider
