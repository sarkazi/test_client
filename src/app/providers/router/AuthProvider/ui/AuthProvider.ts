import { useEffect, useMemo, useState } from 'react'

import { $api } from '../../../../../shared/api/api'

import { AuthContext } from '../../../../../shared/lib/context/AuthContextt'

const AuthProvider = ({ children }) => {
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
    <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
