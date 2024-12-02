import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { GoogleOAuthProvider } from '@react-oauth/google'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <GoogleOAuthProvider clientId="44278308785-cmoev9iv03ho0meol66tslpkk2nrk7dk.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
)
