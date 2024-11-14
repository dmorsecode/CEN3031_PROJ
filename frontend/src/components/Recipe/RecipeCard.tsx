import recipeTest from 'assets/recipe_test.jpg'
import RecipeInfo from 'components/Recipe/RecipeInfo'
import IngredientList from './IngredientList'
import InstructionList from './InstructionList'
import { useState } from 'react'

function RecipeCard({recipe, editable} : {recipe?: any, editable?: boolean}) {
  const [recipeView, setRecipe] = useState(recipe ?? { info: null, instructions: null, ingredients: [] });

  function addIngredient(amt: any, unit: any, ingredient: any) {
    if (!amt || !unit || !ingredient) return;
    setRecipe({
      info: recipeView.info,
      instructions: recipeView.instructions,
      ingredients: [
        ...recipeView.ingredients,
        {
          ingredient: ingredient,
          amount: amt,
          measurement: unit,
          perKg: 0
        }
      ]
    })
  }

  function addInstruction(instruction: string[]) {
    if (!instruction) return;
    let newInstructions = recipeView.instructions ? recipeView.instructions.split(/\r?\n/) : [];
    newInstructions.push(instruction);
    setRecipe({
      info: recipeView.info,
      instructions: newInstructions.join('\n'),
      ingredients: recipeView.ingredients
    })
  }

  return (
    <div className="w-3/4 m-auto">
      <div className="w-full max-h-1/3 h-[33vh] flex flex-col lg:flex-row items-center rounded-t-3xl overflow-hidden mb-2 p-4">
        <img
          className="h-full min-h-[200px] border-2 border-neutral object-cover rounded-tl-3xl md:basis-1/3"
          src={recipeTest}
          alt={recipeView?.info?.title} />

        <div className="md:basis-2/3 h-full">
          <RecipeInfo title={recipeView?.info?.title} description={recipeView?.info?.description} prep={recipeView?.info?.prepTime} cook={recipeView?.info?.cookTime} servings={recipeView?.info?.servings} editable={editable} />
        </div>
      </div>
      <div className="w-full h-2/3 flex flex-col lg:flex-row items-start gap-2 p-4 pt-0">
        <div className="basis-1/3 w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
          <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl">
            <h2 className="card-title">INGREDIENTS</h2>
            <IngredientList key={recipeView?.ingredients.Length} ingredientList={recipeView?.ingredients} editable={editable} addIngredient={addIngredient} />
          </div>
        </div>
        <div
          className="basis-2/3 w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
          <InstructionList instructions={recipeView?.instructions ? recipeView.instructions.split(/\r?\n/) : []} editable={editable} addInstruction={addInstruction} />
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
