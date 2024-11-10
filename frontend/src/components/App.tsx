import { Route, Routes } from 'react-router-dom'
import HomePage from 'routes/HomePage'
import RecipeView from 'routes/RecipeView'
import TrackerPage from 'routes/TrackerPage';
import NavBar from 'components/NavBar'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipeView />} />
        <Route path="/tracker" element={<TrackerPage />} />
      </Routes>
    </div>
  )
}

export default App
