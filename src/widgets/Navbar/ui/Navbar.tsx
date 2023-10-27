import { useContext, type FC } from 'react'
import { AppBar, Toolbar, Box, Slide, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.scss'

import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

import useScrollTrigger from '@mui/material/useScrollTrigger'

import { ThemeContext } from '../../../shared/lib/context/ThemeContext'
import { ThemeSwitcher } from '../../../widgets/ThemeSwitcher'
import { LanguageSwitcher } from '../../../widgets/LanguageSwitcher'

import Logo from '../../../shared/assets/images/logo.svg'

interface INavbarProps {
  window?: () => Window
}

const Navbar: FC = (props: INavbarProps) => {
  const { t } = useTranslation()

  const { theme } = useContext(ThemeContext)

  const { window } = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        color="secondary"
        className={clsx(classes.header, theme === 'dark' && classes.dark)}
      >
        <Toolbar className={classes.toolbar}>
          <Box
            className={clsx(classes.containerMain, 'flexBetween columnGapXs')}
          >
            <Box className="flexAlignCenter columnGapXs textNoWrap">
              <Link to="/" className="flexAlignJustifyCenter">
                <Logo
                  className={clsx(
                    classes.logo,
                    theme === 'light' && classes.dark
                  )}
                />
              </Link>

              <Box className="flexAlignCenter columnGapXs">
                <Link to="/submit">
                  <Button color="primary" variant="contained">
                    <Typography variant="button">{t('submitVideo')}</Typography>
                  </Button>
                </Link>

                <Link to="/">
                  {<Typography variant="button">{t('home')}</Typography>}
                </Link>
                <Link to="/library">
                  {
                    <Typography variant="button">
                      {t('videoLibrary')}
                    </Typography>
                  }
                </Link>
                <Link to="/about">
                  {<Typography variant="button">{t('aboutUs')}</Typography>}
                </Link>
                <Link to="/contactUs">
                  {<Typography variant="button">{t('contactUs')}</Typography>}
                </Link>
                <Link to="/login">
                  {<Typography variant="button">{t('login')}</Typography>}
                </Link>
              </Box>
            </Box>
            <Box className="flexAlignCenter columnGapXs">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default Navbar
