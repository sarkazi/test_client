import { useEffect, useContext, memo } from 'react'
import { Button, notification } from 'antd'

import styles from './ReviewsPage.module.scss'
import { useState } from 'react'
import { $api } from '../../../../shared/api/api'
import { UserContext } from '../../../../shared/lib/context/AuthContextt'
import { ReviewInterface } from '../../../../entity/Review/model/types'
import { Page } from '../../../../widgets/Page'
import ReviewModal from '../ReviewModal/ReviewModal'
import ReviewTable from '../ReviewTable/ReviewTable'

export interface ReviewsDataSate {
  isLoading: boolean
  values: ReviewInterface[]
  totalCount: number
}

const ReviewsPage = memo(() => {
  const itemLimit = 7

  const { user } = useContext(UserContext)

  const [reviewsData, setReviewsData] = useState<ReviewsDataSate>({
    isLoading: true,
    values: [],
    totalCount: 0
  })
  const [toggleChange, setToggleChange] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const [activeRecord, setActiveRecord] = useState<ReviewInterface | {}>({
    email: user?.email
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await $api.get('/review', {
          params: {
            limit: itemLimit,
            offset: (currentPage - 1) * itemLimit
          }
        })

        if (data.status === 'success') {
          setReviewsData((prev) => ({
            ...prev,
            values: data.apiData.reviews,
            totalCount: data.apiData.totalCount
          }))
        }
      } catch (err) {
        console.log(err)

        notification.error({
          message: 'Ошибка при получении списка отзывов...'
        })
      } finally {
        setReviewsData((prev) => ({
          ...prev,
          isLoading: false
        }))
      }
    })()
  }, [toggleChange, currentPage])

  const showModal = () => {
    setModalOpened(true)
  }

  const handleCreateClick = async () => {
    showModal()

    try {
      const { data } = await $api.post('/review', {
        email: user!.email
      })

      if (data.status === 'success') {
        setToggleChange(!toggleChange)
        setActiveRecord(() => data.apiData)
      } else {
        notification.warning({ message: data.message })
      }
    } catch (err) {
      console.log(err)

      notification.error({
        message: err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Server-side error'
      })
    }
    setActiveRecord((prev) => ({ ...prev, email: user!.email }))
  }

  return (
    <Page>
      <ReviewModal
        activeRecord={activeRecord}
        toggleChange={toggleChange}
        modalOpened={modalOpened}
        setActiveRecord={setActiveRecord}
        setModalOpened={setModalOpened}
        setToggleChange={setToggleChange}
      />

      <div className={styles.tableOverlay}>
        <Button onClick={handleCreateClick} className={styles.btnPlus}>
          Добавить карточку
        </Button>

        <ReviewTable
          showModal={showModal}
          reviewsData={reviewsData}
          itemLimit={itemLimit}
          activeRecord={activeRecord}
          setActiveRecord={setActiveRecord}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Page>
  )
})

export default ReviewsPage
