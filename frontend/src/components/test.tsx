import { render, screen } from '@testing-library/react'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(<App />, {wrapper: BrowserRouter})

    expect(
      screen.getByRole('heading', {
        name: /Welcome!/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('navigation')
    ).toBeInTheDocument()
  })
})
