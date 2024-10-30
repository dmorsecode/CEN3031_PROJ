import recipeTest from 'assets/recipe_test.jpg'

function App() {
  return (
    <div className="card card-compact bg-base-100 w-11/12 h-screen m-auto shadow-xl">
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 h-1/3 gap-2 gap-y-4">
          <img
            className="w-full h-full min-h-[200px] object-cover rounded-tl-xl"
            src={recipeTest}
            alt="Recipe Alt Text" />
          <div className="flex flex-col grow w-full h-full items-center justify-center p-2">
            <h2 className="text-4xl">Recipe Name</h2>
            <div className="flex flex-col items-center">
              <div className="divider divider-neutral opacity-50 w-full" />
              <p className="w-full text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed
                do eiusmod
                tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt
                mollit anim id est laborum.</p>
              <div className="divider divider-neutral opacity-50 w-full" />
            </div>
            <div className="flex  justify-between text-md text-center font-bold gap-y-1">
              <p>Prep Time: 50min</p>
              <div className="divider divider-neutral opacity-50 divider-horizontal" />
              <p>Cook Time: 50min</p>
              <div className="divider divider-neutral opacity-50 divider-horizontal" />
              <p>Servings: 4</p>
            </div>
          </div>

          <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body border-t-neutral border-t-[12px]">
              <h2 className="card-title">Ingredients</h2>
              <p>A list of ingredients would go here.</p>
            </div>
          </div>
          <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body border-t-neutral border-t-[12px]">
              <h2 className="card-title">Other Info</h2>
              <p>What other info goes here?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
