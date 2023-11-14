import { memo, useCallback } from 'react'
import { Button, Form, Input, Modal, notification } from 'antd'

import styles from './ReviewModal.module.scss'
import { ReviewInterface } from '../../../../entity/Review/model/types'
import { $api } from '../../../../shared/api/api'

interface ReviewModalProps {
  activeRecord: ReviewInterface | {}
  toggleChange: boolean
  modalOpened: boolean
  setActiveRecord: (activeRecord: ReviewInterface | {}) => void
  setModalOpened: (modalOpened: boolean) => void
  setToggleChange: (toggleChange: boolean) => void
}

const ReviewModal = memo((props: ReviewModalProps) => {
  const {
    toggleChange,
    activeRecord,
    setActiveRecord,
    modalOpened,
    setModalOpened,
    setToggleChange
  } = props

  const { TextArea } = Input

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

  const handleModalCancel = useCallback(() => {
    setModalOpened(false)
    setActiveRecord({})
  }, [])

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

  return (
    <Modal
      open={modalOpened}
      className={styles.modal}
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
  )
})

export default ReviewModal
