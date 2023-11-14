import { memo } from 'react'
import { Button, Form, Input, Modal } from 'antd'

import styles from './FeedbackPage.module.scss'
import { ReviewInterface } from '../../model/types'

const { TextArea } = Input

interface ReviewModalProps {
  opened: boolean
  title: string
  handleOk: () => void
  handleCancel: () => void
  okText: string
  customHandleOk: () => void
  reviewAction: 'update' | 'create'
  activeRecord: ReviewInterface
  setActiveRecord: (review: ReviewInterface) => void
}

const ReviewModal = memo((props: ReviewModalProps) => {
  const {
    opened,
    title,
    handleOk,
    handleCancel,
    okText,
    customHandleOk,
    reviewAction,
    activeRecord,
    setActiveRecord
  } = props

  return (
    <Modal
      open={opened}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      okText={okText}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          {reviewAction === 'update' && (
            <Button onClick={customHandleOk} danger>
              Удалить
            </Button>
          )}
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
