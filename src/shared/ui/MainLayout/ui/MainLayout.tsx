import { Space, Layout } from 'antd'
import styles from './MainLayout.module.scss'
import { ReactElement } from 'react'

interface MainLayoutProps {
  header: ReactElement
  content: ReactElement
}

const MainLayout = (props: MainLayoutProps) => {
  const { header, content } = props

  return (
    <Layout className={styles.layout}>
      {header}
      {content}
    </Layout>
  )
}

export default MainLayout
