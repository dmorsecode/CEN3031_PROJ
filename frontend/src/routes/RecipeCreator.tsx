import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import RecipeCard from '../components/Recipe/RecipeCard'

function HomePage() {
  return (
    <div className="m-2">
      <RecipeCard editable={true} />
    </div>
  )
}

export default HomePage
