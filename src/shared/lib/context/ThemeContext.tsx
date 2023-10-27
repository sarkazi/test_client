import { type PaletteMode } from '@mui/material'
import { createContext } from 'react'

export interface ThemeContextProps {
  theme?: PaletteMode
  setTheme?: (theme: PaletteMode) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})
