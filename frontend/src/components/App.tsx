import { Route, Routes } from 'react-router-dom'
import HomePage from 'routes/HomePage'
import RecipeView from 'routes/RecipeView'
import NavBar from 'components/NavBar'
import RecipeListing from '../routes/RecipeListing'

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipeView />} />
        <Route path="/recipes" element={<RecipeListing />} />
      </Routes>
    </div>
  )
}

export default App
