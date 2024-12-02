import { Route, Routes } from 'react-router-dom'
import HomePage from 'routes/HomePage'
import RecipeView from 'routes/RecipeView'
import RecipeCreator from 'routes/RecipeCreator'
import TrackerPage from 'routes/TrackerPage'
import NavBar from 'components/NavBar'
import RecipeListing from 'routes/RecipeListing'
import { createContext, useState } from 'react'

export const UserContext = createContext({ user: {access_token: ""}, setUser: (user: any) => {} })
export const ProfileContext = createContext({ profile: {picture: "", name: "", email: ""}, setProfile: (profile: any) => {} })

function App() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <ProfileContext.Provider value={{ profile: profile, setProfile: setProfile }}>
        <div className="h-[calc(100vh-4.5rem)]">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe" element={<RecipeView />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/recipe/create" element={<RecipeCreator />} />
            <Route path="/recipes" element={<RecipeListing />} />
          </Routes>
        </div>
      </ProfileContext.Provider>
    </UserContext.Provider>
  )
}

export default App
