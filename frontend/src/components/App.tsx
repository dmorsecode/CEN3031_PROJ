import { Route, Routes } from 'react-router-dom'
import HomePage from 'routes/HomePage'
import RecipeView from 'routes/RecipeView'
import NavBar from 'components/NavBar'

function App() {
  return (
    <div className="h-[calc(100vh-4.5rem)]">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipeView />} />
      </Routes>
    </div>
  )
}

export default App
