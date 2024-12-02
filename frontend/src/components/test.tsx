import { render, screen } from '@testing-library/react'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(
      <GoogleOAuthProvider clientId="44278308785-cmoev9iv03ho0meol66tslpkk2nrk7dk.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>)

    expect(
      screen.getByRole('button', {
        name: /SIGN IN WITH GOOGLE/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('navigation')
    ).toBeInTheDocument()
  })
})
