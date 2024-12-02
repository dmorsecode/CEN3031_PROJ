import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import RecipeCard from '../components/Recipe/RecipeCard'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
  category: "Dinner",
  description: "A delicious salmon recipe. Normally, you might have an actual description here, and it might take up a lot of space. Therefore, there is plenty of room. However, it will disappear if the screen size is too small.",
  prepTime: 10,
  cookTime: 20,
  servings: 2,
}

const mockRecipe = {
  info: mockInfo,
  instructions: "Here's a first step.\nNow a second step.\nFinally a third step.",
  ingredients: mockIngredients,
}

const emptyRecipe = {
  info: {
    title: "",
    category: "",
    description: "",
    prepTime: 0,
    cookTime: 0,
    servings: 0,
  },
  instructions: "",
  ingredients: [{}],
}

function HomePage() {
  const [recipe, setRecipe] = useState(emptyRecipe);
  let { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await fetch(`http://134.209.114.122:8000/recipes/${id}`);
    const data = await response.json();
    console.log(data);
    let ingredients = [];
    for (let i = 0; i < data.ingredients.length; i++) {
      ingredients.push({
        ingredient: data.ingredients[i].name,
        amount: 1,
        measurement: "Kg",
        perKg: data.ingredients[i].carbon_emission,
      })
    }
    let grabbedRecipe = {
      info: {
        title: data.title,
        category: data.recipe_category[0].name,
        description: data.description ?? "This recipe has no description.",
        prepTime: data.prep_time,
        cookTime: data.cook_time,
        servings: 1,
      },
      instructions: data.instructions,
      ingredients: ingredients,
    }
    setRecipe(grabbedRecipe);
  };

  return (
    <div className="m-2">
      <RecipeCard recipe={recipe} />
    </div>
  )
}

export default HomePage
