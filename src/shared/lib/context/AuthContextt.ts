import { createContext } from 'react'
import { UserInterface } from '../../../entity/User/model/types'

interface UserContextProps {
  user?: UserInterface
  setUser?: (user: UserInterface) => void
}

export const UserContext = createContext<UserContextProps>({})
