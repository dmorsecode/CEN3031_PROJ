import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import RecipeCard from '../components/Recipe/RecipeCard'

const mockIngredients = [
  { ingredient: 'Salmon', amount: 2, measurement: "Filet", perKg: 3.5 },
  { ingredient: 'Rice', amount: 1, measurement: "Cup", perKg: 1.2 },
  { ingredient: 'Broccoli', amount: 1, measurement: "Head", perKg: 0.8 },
  { ingredient: 'Soy Sauce', amount: 1, measurement: "Tbsp", perKg: 0.5 },
  { ingredient: 'Garlic', amount: 2, measurement: "Cloves", perKg: 0.3 },
  { ingredient: 'Ginger', amount: 1, measurement: "Tbsp", perKg: 0.4 },
]

const mockInfo = {
  title: "Salmon Whatever",
  description: "A delicious salmon recipe. Normally, you might have an actual description here, and it might take up a lot of space. Therefore, there is plenty of room. However, it will disappear if the screen size is too small.",
  prepTime: 10,
  cookTime: 20,
  servings: 2,
}

const mockRecipe = {
  info: mockInfo,
  ingredients: mockIngredients,
}

function HomePage() {
  return (
    <div className="m-2">
      <RecipeCard />
    </div>
  )
}

export default HomePage
