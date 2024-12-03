import recipeTest from 'assets/recipe_test.jpg'
import RecipeInfo from 'components/Recipe/RecipeInfo'
import IngredientList from './IngredientList'
import InstructionList from './InstructionList'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

function RecipeCard({ recipe, editable }: { recipe?: any, editable?: boolean }) {
  const [recipeView, setRecipe] = useState(recipe ?? { info: {}, instructions: null, ingredients: [] })
  const [servingsMultiplier, setServingsMultiplier] = useState(recipe && recipe.info ? recipe.info.servings : 1)
  const navigate = useNavigate();

  function addIngredient(amt: any, unit: any, ingredient: { name: string, perKg: string }) {
    if (!amt) amt = 1
    if (!unit || !ingredient) return
    setRecipe({
      info: recipeView.info,
      instructions: recipeView.instructions,
      ingredients: [
        ...recipeView.ingredients,
        {
          ingredient: ingredient.name,
          amount: amt,
          measurement: unit,
          perKg: ingredient.perKg
        }
      ]
    })
  }

  useEffect(() => {
    setRecipe(recipe ?? recipeView ?? { info: {}, instructions: null, ingredients: [] })
    setServingsMultiplier(recipe && recipe.info ? recipe.info.servings : 1)
  }, [recipe])

  function modifyServings(multiplier: number) {
    setServingsMultiplier(servingsMultiplier + multiplier)
    setRecipe({
      info: recipeView?.info,
      instructions: recipeView?.instructions,
      ingredients: recipeView?.ingredients
    })
  }

  function addInstruction(instruction: string[]) {
    if (!instruction) return
    let newInstructions = recipeView?.instructions ? recipeView.instructions.split(/\r?\n/) : []
    newInstructions.push(instruction)
    setRecipe({
      info: recipeView?.info,
      instructions: newInstructions.join('\n'),
      ingredients: recipeView?.ingredients
    })
  }

  function sendRecipe(info: any) {
    if (!info.title || !info.category || !info.description || !info.prepTime || !info.cookTime || !info.servings) return
    if (!recipeView?.ingredients?.length || !recipeView?.instructions?.length) return
    let recipeTest = {
      info: info,
      instructions: recipeView?.instructions,
      ingredients: recipeView?.ingredients
    }
    // calculate total emissions of all ingredients when accounting for their amount and perKg value
    let emissions = 0;
    for (let i = 0; i < recipeView.ingredients.length; i++) {
      emissions += recipeView.ingredients[i].amount * recipeView.ingredients[i].perKg
    }
    let date = new Date().toISOString().split('T')[0];
    axios.post('http://134.209.114.122:8000/backup_recipe/', {
      headers: {
        'Content-Type': 'application/json'
      },
      // body: {
        title: info.title,
        description: info.description,
        ingredients: [],
        instructions: recipeView?.instructions,
        prep_time: info.prepTime,
        cook_time: info.cookTime,
        recipe_category: [],
        total_emission: emissions,
        created_at: date,
        updated_at: date,
      // }
    })
      .then((res) => {
        // send each ingredient to a different endpoint
        for (let i = 0; i < recipeView.ingredients.length; i++) {
          axios.post('http://134.209.114.122:8000/recipeingredient/', {
            headers: {
              'Content-Type': 'application/json'
            },
            // body: {
              recipe: info.title,
              ingredient: recipeView.ingredients[i].ingredient,
              amount: recipeView.ingredients[i].amount,
            // }
          })
            .then((res) => {
              navigate('/recipes')
            })
            .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="w-3/4 m-auto">
      <div
        className="w-full max-h-1/3 h-[33vh] flex flex-col lg:flex-row items-center rounded-t-3xl overflow-hidden mb-2 p-4">
        <img
          className="h-full min-h-[200px] border-2 border-neutral object-cover rounded-tl-3xl md:basis-1/3"
          src={recipeTest}
          alt={recipeView?.info?.title} />

        <div className="md:basis-2/3 h-full">
          <RecipeInfo title={recipeView?.info?.title} category={recipeView?.info?.category}
                      description={recipeView?.info?.description} prep={recipeView?.info?.prepTime}
                      cook={recipeView?.info?.cookTime} servings={recipeView?.info?.servings} editable={editable}
                      modifyServings={modifyServings} sendRecipe={sendRecipe} />
        </div>
      </div>
      <div className="w-full h-2/3 flex flex-col lg:flex-row items-start gap-2 p-4 pt-0">
        <div className="basis-1/3 w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
          <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl">
            <h2 className="card-title">INGREDIENTS</h2>
            <IngredientList key={recipeView?.ingredients?.Length} ingredientList={recipeView?.ingredients}
                            editable={editable} addIngredient={addIngredient} servings={recipeView?.info?.servings}
                            servingsMultiplier={servingsMultiplier} />
          </div>
        </div>
        <div
          className="basis-2/3 w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
          <InstructionList instructions={recipeView?.instructions ? recipeView.instructions?.split(/\r?\n/) : []}
                           editable={editable} addInstruction={addInstruction} />
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
