import { render, screen } from '@testing-library/react'
import { Button } from '@mui/material'
// import '@testing-library/jest-dom'

describe('ff', () => {
  test('loads and displays greeting', () => {
    render(<Button>Вася</Button>)

    expect(screen.getByText('Вася')).toBeInTheDocument()
  })
})
