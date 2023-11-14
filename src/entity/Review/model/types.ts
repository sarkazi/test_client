export type ReviewStatus = 'Черновик' | 'Опубликован'

export interface ReviewInterface {
  id: string
  email: string
  text: string
  created_at: string
  updated_at: string
  user_id: number
  status: ReviewStatus
}
