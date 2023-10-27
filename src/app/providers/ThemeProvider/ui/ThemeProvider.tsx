import { type ReactNode, useMemo, useState, type FC } from 'react'
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext'
import { createTheme, CssBaseline, type PaletteMode } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { purple, cyan, lightGreen } from '@mui/material/colors'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props

  const [theme, setTheme] = useState<PaletteMode>('light')

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: purple[300],
        light: lightGreen[100]
      },
      secondary: {
        main: '#fafafa'
      }
    }
  })

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
