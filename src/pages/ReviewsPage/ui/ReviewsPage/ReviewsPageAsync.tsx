import { lazy } from 'react'

export const ReviewPageAsync = lazy(async () => await import('./ReviewsPage'))
