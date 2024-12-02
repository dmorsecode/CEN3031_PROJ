import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

import App from 'components/App'
import { GoogleOAuthProvider } from '@react-oauth/google'

describe('<NavBar />', () => {
  it('should render the NavBar', () => {
    const { container } = render(
      <GoogleOAuthProvider clientId="44278308785-cmoev9iv03ho0meol66tslpkk2nrk7dk.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>)

    expect(
      screen.getByRole('navigation')
    ).toBeInTheDocument()

    expect(container.firstChild?.firstChild).toHaveTextContent('Home')
  })
})
