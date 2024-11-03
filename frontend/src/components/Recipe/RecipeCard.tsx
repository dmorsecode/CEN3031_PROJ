import recipeTest from 'assets/recipe_test.jpg'
import RecipeInfo from 'components/Recipe/RecipeInfo'

function RecipeCard() {
  return (
    <div className="w-4/5 md:w-1/2 h-auto m-auto shadow-lg border border-neutral border-opacity-10 rounded-3xl bg-base-100">
      <div className="w-full max-h-1/3 h-[33vh] flex flex-col lg:flex-row items-center rounded-t-3xl overflow-hidden mb-2 p-4">
        <img
          className="h-full min-h-[200px] border-2 border-neutral object-cover rounded-tl-3xl md:basis-1/3"
          src={recipeTest}
          alt="Recipe Alt Text" />

        <div className="md:basis-2/3">
          <RecipeInfo />
        </div>
      </div>
      <div className="w-full h-2/3 flex flex-col lg:flex-row items-start gap-4 p-4 pt-0">
        <div className="basis-1/3 w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
          <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl">
            <h2 className="card-title">INGREDIENTS</h2>
            <div className="text-lg">
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
              <p>Ingredient x1</p>
            </div>
          </div>
        </div>
        <div
          className="grow w-full card card-compact shadow-xl border-t-neutral border-t-[12px] !rounded-t-none">
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
