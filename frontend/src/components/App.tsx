import { Route, Routes } from 'react-router-dom'
import HomePage from 'routes/HomePage'
import RecipeView from 'routes/RecipeView'
import RecipeCreator from 'routes/RecipeCreator'
import NavBar from 'components/NavBar'
import RecipeListing from 'routes/RecipeListing'

function App() {
  return (
    <div className="h-[calc(100vh-4.5rem)]">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipeView />} />
        <Route path="/recipe/create" element={<RecipeCreator />} />
        <Route path="/recipes" element={<RecipeListing />} />
      </Routes>
    </div>
  )
}

export default App
