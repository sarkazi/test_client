import { lazy } from 'react'

export const FeedbackPageAsync = lazy(
  async () => await import('./FeedbackPage')
)
