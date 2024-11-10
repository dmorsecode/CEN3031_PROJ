import recipeTest from 'assets/recipe_test.jpg'
import RecipeInfo from 'components/Recipe/RecipeInfo'
import Ingredient from './Ingredient'

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

function RecipeCard({editable = false}) {
  return (
    <div className="w-3/4 m-auto">
      <div className="w-full max-h-1/3 h-[33vh] flex flex-col lg:flex-row items-center rounded-t-3xl overflow-hidden mb-2 p-4">
        <img
          className="h-full min-h-[200px] border-2 border-neutral object-cover rounded-tl-3xl md:basis-1/3"
          src={recipeTest}
          alt={mockInfo.title} />

        <div className="md:basis-2/3 h-full">
          <RecipeInfo title={mockInfo.title} description={mockInfo.description} prep={mockInfo.prepTime} cook={mockInfo.cookTime} servings={mockInfo.servings} editable={editable} />
        </div>
      </div>
      <div className="w-full h-2/3 flex flex-col lg:flex-row items-start gap-2 p-4 pt-0">
        <div className="basis-1/3 w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
          <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl">
            <h2 className="card-title">INGREDIENTS</h2>
            <div className="text-md xl:text-lg flex flex-col gap-2">
              {mockIngredients.map((ingredient, index) => (
                <Ingredient key={index} ingredient={ingredient.ingredient} amount={ingredient.amount} measurement={ingredient.measurement} perKg={ingredient.perKg} />
              ))}
              <div className="divider w-full m-auto" />
              <div className="w-full flex hover:scale-[101%] duration-200">
                <p className="basis-1/2">Total Emissions</p>
                <p className="basis-1/2 text-right">{"##"} <span className="text-sm">kgCO2 / kg</span></p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="basis-2/3 w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
          <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl">
            <div className="text-lg">
              <h2 className="card-title">Step 1</h2>
              <p>Do a thing.</p>
              <div className="divider" />
              <h2 className="card-title">Step 2</h2>
              <p>Do a second thing.</p>
              <div className="divider" />
              <h2 className="card-title">Step 3</h2>
              <p>Finish the recipe.</p>
              <div className="divider" />
              <h2 className="card-title">Step 4</h2>
              <p>Serve.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
