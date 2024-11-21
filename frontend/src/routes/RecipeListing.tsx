import { useState } from 'react'

const recipe1 = {
  id: 0,
  title: 'Salmon Dish',
  description: 'A delicious salmon recipe. This is where the description would go.',
  prepTime: 10,
  cookTime: 20,
  servings: 2,
  emissions: 50,
  category: 'Dinner'
}

const mockRecipes = [
  {
    id: 0,
    title: 'Salmon Dish',
    description: 'A delicious salmon recipe. This is where the description would go.',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    emissions: 50,
    category: 'Dinner',
    ingredients: [1,2,3]
  },
  {
    id: 1,
    title: 'Pasta Dish',
    description: 'A delicious pasta recipe. This is where the description would go.',
    prepTime: 10,
    cookTime: 20,
    servings: 3,
    emissions: 20,
    category: 'Lunch',
    ingredients: [1,2,3]
  },
  {
    id: 2,
    title: 'Salad Dish',
    description: 'A delicious salad recipe. This is where the description would go.',
    prepTime: 30,
    cookTime: 10,
    servings: 4,
    emissions: 30,
    category: 'Breakfast',
    ingredients: [1,2]
  },
  {
    id: 3,
    title: 'Burger Dish',
    description: 'A delicious burger recipe. This is where the description would go.',
    prepTime: 20,
    cookTime: 20,
    servings: 8,
    emissions: 100,
    category: 'Dinner',
    ingredients: [1,2,3,4]
  },
  {
    id: 4,
    title: 'Pizza Dish',
    description: 'A delicious pizza recipe. This is where the description would go.',
    prepTime: 50,
    cookTime: 20,
    servings: 2,
    emissions: 5,
    category: 'Lunch',
    ingredients: [1,2,3,4,5,6]
  },
  {
    id: 5,
    title: 'Taco Dish',
    description: 'A delicious taco recipe. This is where the description would go.',
    prepTime: 10,
    cookTime: 20,
    servings: 6,
    emissions: 40,
    category: 'Dinner',
    ingredients: [1,2,3,4,5]
  },
  {
    id: 6,
    title: 'Sushi Dish',
    description: 'A delicious sushi recipe. This is where the description would go.',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    emissions: 10,
    category: 'Lunch',
    ingredients: [1,2,3,4,5,6,7]
  },
  {
    id: 7,
    title: 'Curry Dish',
    description: 'A delicious curry recipe. This is where the description would go.',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    emissions: 70,
    category: 'Dinner',
    ingredients: [1,2,3,4,5,6,7,8]
  }
]

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSort, setSelectedSort] = useState('Emissions')

  function handleSortChange(sort: string) {
    console.log(sort);
    mockRecipes.sort((a, b) => {
      switch (sort) {
        case 'Emissions':
          return b.emissions - a.emissions
        case 'Servings':
          return b.servings - a.servings
        case 'Ingredients':
          return b.ingredients.length - a.ingredients.length
        case 'Time':
          return (b.prepTime + b.cookTime) - (a.prepTime + a.cookTime)
        default:
          return 0
      }
    })
    setSelectedSort(sort);
  }

  return (
    <div className="flex w-3/4 m-auto gap-4 my-2">
      <div id="sidebar" className="basis-1/4">
        <ul className="menu menu-md rounded-box border border-neutral">
          <li>
            <h2 className="menu-title text-neutral-800 text-xl">CATEGORIES</h2>
            <ul className="font-bold">
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => setSelectedCategory('All')}>All</a></li>
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'Breakfast' ? 'active' : ''}`} onClick={() => setSelectedCategory('Breakfast')}>Breakfast</a></li>
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'Lunch' ? 'active' : ''}`} onClick={() => setSelectedCategory('Lunch')}>Lunch</a></li>
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'Dinner' ? 'active' : ''}`} onClick={() => setSelectedCategory('Dinner')}>Dinner</a></li>
            </ul>
          </li>
          <div className="divider m-auto my-2 w-full"></div>
          <li>
            <h2 className="menu-title text-neutral-800 text-xl">SORT BY DESCENDING ...</h2>
            <ul className="font-bold">
              <li><a onClick={() => handleSortChange("Emissions")} className={`transition-colors duration-200 ${selectedSort === 'Emissions' ? 'active' : ''}`}>Emissions</a></li>
              <li><a onClick={() => handleSortChange("Servings")} className={`transition-colors duration-200 ${selectedSort === 'Servings' ? 'active' : ''}`}>Servings</a></li>
              <li><a onClick={() => handleSortChange("Ingredients")} className={`transition-colors duration-200 ${selectedSort === 'Ingredients' ? 'active' : ''}`}>Ingredients</a></li>
              <li><a onClick={() => handleSortChange("Time")} className={`transition-colors duration-200 ${selectedSort === 'Time' ? 'active' : ''}`}>Time</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="grow join join-vertical rounded-box">
        {mockRecipes.filter(recipe => selectedCategory === 'All' || recipe.category === selectedCategory).map((recipe, index) => (
          <div key={index} className="collapse collapse-arrow join-item border border-neutral">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium text-neutral">{recipe.title}</div>
            <div className="collapse-content">
              <p className="pt-4">{recipe.description}</p>
              <div className="flex justify-between text-md xl:text-xl">
                <div className="flex gap-8 basis-2/3">
                  <p className="pt-4"><span className="font-bold text-red-600">Emissions:</span> {recipe.emissions} <span className="text-sm">kgCO2</span></p>
                  <p className="pt-4"><span
                    className="font-bold text-blue-600">Total Time:</span> {recipe.prepTime + recipe.cookTime} <span
                    className="text-sm">minutes</span></p>
                  <p className="pt-4"><span className="font-bold text-green-600">Servings:</span> {recipe.servings}</p>
                </div>
                <button className="btn btn-xs sm:btn-sm md:btn-md btn-info text-info-content text-xl">View Recipe</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
