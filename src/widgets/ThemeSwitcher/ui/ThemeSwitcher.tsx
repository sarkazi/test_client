import { useContext, type FC } from 'react'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { ThemeContext } from '../../../shared/lib/context/ThemeContext'

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <IconButton
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  )
}

export default ThemeSwitcher
