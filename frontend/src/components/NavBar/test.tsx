import { render, screen } from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

import App from 'components/App'

describe('<NavBar />', () => {
  it('should render the NavBar', () => {
    const { container } = render(<App />, {wrapper: BrowserRouter})

    expect(
      screen.getByRole('navigation')
    ).toBeInTheDocument()

    expect(container.firstChild?.firstChild).toHaveTextContent('Home')
  })
})
