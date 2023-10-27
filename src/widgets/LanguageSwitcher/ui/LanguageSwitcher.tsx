import { IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type FC } from 'react'
import { type localeType } from 'src/app/config/i18n/types/types'

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const toggleLanguage = (): localeType => {
    void i18n.changeLanguage(currentLanguage === 'cn' ? 'en' : 'cn')
  }

  return (
    <IconButton onClick={toggleLanguage}>
      <Typography variant="button">{currentLanguage}</Typography>
    </IconButton>
  )
}

export default LanguageSwitcher
