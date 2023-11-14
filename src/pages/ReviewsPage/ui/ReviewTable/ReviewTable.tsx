import { memo } from 'react'
import { Table } from 'antd'

import styles from './ReviewTable.module.scss'
import {
  ReviewInterface,
  ReviewStatus
} from '../../../../entity/Review/model/types'

import { ReviewsDataSate } from '../ReviewsPage/ReviewsPage'
import { ColumnsType } from 'antd/es/table'

interface ReviewModalProps {
  reviewsData: ReviewsDataSate
  setActiveRecord: (activeRecord: ReviewInterface | {}) => void
  activeRecord: ReviewInterface | {}
  itemLimit: number
  showModal: () => void
  setCurrentPage: (currentPage: number) => void
}

const ReviewTable = memo((props: ReviewModalProps) => {
  const { reviewsData, setActiveRecord, itemLimit, showModal, setCurrentPage } =
    props

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
      onFilter: (value: ReviewStatus, record: ReviewInterface) =>
        record.status === value
    }
  ]

  const handleClickRow = async (recordData: ReviewInterface) => {
    setActiveRecord(recordData)
    showModal()
  }

  const transformDate = (date: string) => {
    return `${new Date(date).toLocaleDateString()} ${new Date(
      date
    ).toLocaleTimeString()}`
  }

  return (
    <Table
      className={styles.table}
      pagination={{
        total: reviewsData.totalCount,
        pageSize: itemLimit,
        onChange: (page) => setCurrentPage(page)
      }}
      loading={reviewsData.isLoading}
      columns={columns}
      dataSource={reviewsData.values.map((data) => {
        return {
          ...data,
          created_at: transformDate(data.created_at),
          updated_at: transformDate(data.updated_at)
        }
      })}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => handleClickRow(record)
        }
      }}
      rowKey={(record: ReviewInterface) => record.id}
    />
  )
})

export default ReviewTable
