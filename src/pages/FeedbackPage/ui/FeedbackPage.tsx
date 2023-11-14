import { useCallback, useEffect, memo, useContext } from 'react'
import { Button, Form, Input, Modal, Table, notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import styles from './FeedbackPage.module.scss'
import { useState } from 'react'
import { $api } from '../../../shared/api/api'
import { UserContext } from '../../../shared/lib/context/AuthContextt'
import { ReviewInterface } from '../../../entity/Review/model/types'

const FeedbackPage = () => {
  const [reviewsData, setReviewsData] = useState({
    isLoading: true,
    values: []
  })
  const [toggleChange, setToggleChange] = useState(false)

  const { user } = useContext(UserContext)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await $api.get('/review')

        if (data.status === 'success') {
          setReviewsData((prev) => ({
            ...prev,
            values: data.apiData
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
  }, [toggleChange])

  type ReviewActionType = 'create' | 'update'

  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const [activeRecord, setActiveRecord] = useState<ReviewInterface | {}>({
    email: user?.email
  })

  const showModal = () => {
    setModalOpened(true)
  }
  const handleUpdate = useCallback(async () => {
    try {
      const { data } = await $api.put(
        `/review/${(activeRecord as ReviewInterface).id}`,
        {
          email: (activeRecord as ReviewInterface).email,
          text: (activeRecord as ReviewInterface).text
        }
      )

      if (data.status === 'success') {
        setModalOpened(false)
        setToggleChange(!toggleChange)
        notification.success({ message: data.message })
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
  }, [activeRecord, toggleChange])

  const handleModalCancel = useCallback(() => {
    setModalOpened(false)
    setActiveRecord({})
  }, [])

  const columns: ColumnsType<ReviewInterface> = [
    {
      title: 'Email пользователя',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Дата добавления',
      dataIndex: 'created_at',
      key: 'createdAt'
    },
    {
      title: 'Дата обновления',
      dataIndex: 'updated_at',
      key: 'updatedAt'
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',

      filters: [
        {
          text: 'Опубликован',
          value: 'Опубликован'
        },
        {
          text: 'Черновик',
          value: 'Черновик'
        }
      ],
      onFilter: (value: string, record) => record.status === value
    }
  ]

  const { TextArea } = Input

  const handleClickRow = async (recordData: ReviewInterface) => {
    setActiveRecord(recordData)
    showModal()
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

  const onDeleteReview = useCallback(async () => {
    try {
      const { data } = await $api.delete(
        `/review/${(activeRecord as ReviewInterface).id}`
      )

      if (data.status === 'success') {
        setModalOpened(false)
        setToggleChange(!toggleChange)
        notification.success({ message: data.message })
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
  }, [toggleChange, activeRecord])

  return (
    <main>
      <Modal
        open={modalOpened}
        title={
          (activeRecord as ReviewInterface).status === 'Черновик'
            ? 'Добавление отзыва'
            : `Редактирование отзыва ${(activeRecord as ReviewInterface).id}`
        }
        onOk={handleUpdate}
        onCancel={handleModalCancel}
        centered
        okButtonProps={{
          disabled:
            !(activeRecord as ReviewInterface).email ||
            !(activeRecord as ReviewInterface).text
        }}
        okText={
          (activeRecord as ReviewInterface).status === 'Черновик'
            ? 'Создать'
            : 'Обновить'
        }
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button onClick={onDeleteReview} danger>
              Удалить
            </Button>

            <OkBtn />
          </>
        )}
      >
        <Form className={styles.form}>
          <Input
            placeholder="Email пользователя"
            value={(activeRecord as ReviewInterface).email}
            onChange={(event) =>
              setActiveRecord(() => ({
                ...activeRecord,
                email: event.target.value
              }))
            }
          />
          <TextArea
            autoSize
            placeholder="Текст отзыва"
            value={(activeRecord as ReviewInterface).text}
            onChange={(event) =>
              setActiveRecord(() => ({
                ...activeRecord,
                text: event.target.value
              }))
            }
          />
        </Form>
      </Modal>

      <div className={styles.tableOverlay}>
        <Button onClick={handleCreateClick} className={styles.btnPlus}>
          Добавить карточку
        </Button>
        <Table
          className={styles.table}
          pagination={false}
          loading={reviewsData.isLoading}
          columns={columns}
          dataSource={reviewsData.values}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => handleClickRow(record)
            }
          }}
        />
      </div>
    </main>
  )
}

export default FeedbackPage
