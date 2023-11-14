import { FC, ReactNode } from 'react'
import styles from './Page.module.scss'

interface PageProps {
  children?: ReactNode
  className?: string
}

export const Page = (props: PageProps) => {
  return (
    <main className={props.className ? styles[props.className] : ''}>
      {props.children}
    </main>
  )
}
