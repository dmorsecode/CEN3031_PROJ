import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const recipe1 = {
  id: 0,
  title: 'Salmon Dish',
  description: 'A delicious salmon recipe. This is where the description would go.',
  prep_time: 10,
  cook_time: 20,
  servings: 2,
  total_emission: 50,
  category: 'Dinner'
}

const mockRecipes = [
  {
    id: 0,
    title: '',
    description: '',
    prep_time: 10,
    cook_time: 20,
    servings: 2,
    total_emission: 50,
    category: '',
    ingredients: [1, 2, 3]
  },
]

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSort, setSelectedSort] = useState('Emissions')
  const [recipes, setRecipes] = useState(mockRecipes)
  const navigate = useNavigate();

  function handleRedirect(recipeID: number) {
    navigate(`/recipe/${recipeID}`)
  }

  function handleSortChange(sort: string) {
    recipes.sort((a, b) => {
      switch (sort) {
        case 'Emissions':
          return b.total_emission - a.total_emission
        case 'Servings':
          return b.servings - a.servings
        case 'Ingredients':
          return b.ingredients.length - a.ingredients.length
        case 'Time':
          return (b.prep_time + b.cook_time) - (a.prep_time + a.cook_time)
        default:
          return 0
      }
    })
    setSelectedSort(sort);
  }

  useEffect(() => {
    fetchData().then(() => handleSortChange(selectedSort))
  }, [])

  const fetchData = async () => {
    axios.get('http://134.209.114.122:8000/get_recipe_list/').then((res) => {
      console.log(res.data.recipes)
      res.data.recipes.forEach((recipe: { prep_time: any, cook_time: any }) => {
        recipe.prep_time = parseInt(recipe.prep_time)
        recipe.cook_time = parseInt(recipe.cook_time)
      });
      res.data.recipes.sort((a: any, b: any) => {
        switch (selectedSort) {
          case 'Emissions':
            return b.total_emission - a.total_emission
          case 'Servings':
            return b.servings - a.servings
          case 'Ingredients':
            return b.ingredients.length - a.ingredients.length
          case 'Time':
            return (b.prep_time + b.cook_time) - (a.prep_time + a.cook_time)
          default:
            return 0
        }
      })
      setRecipes(res.data.recipes)
    });
  };

  const breakfastIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-full mr-2">
      <path fill="currentColor"
            d="M20 3H6c-1.1 0-2 .9-2 2v8c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2a2 2 0 0 0 2-2V5c0-1.1-.9-2-2-2m0 5h-2V5h2zM5 19h14c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1"></path>
    </svg>
  )

  const lunchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-full mr-2">
      <path fill="currentColor"
            d="M3.37 14.28c.79-.29 1.17-.78 1.99-.78c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c.81 0 1.17.46 1.93.76c.67.26 1.39-.25 1.39-.96c0-.43-.28-.81-.69-.96c-.97-.35-1.22-.83-2.65-.83c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.55 0-1.96.63-2.68.89c-.39.14-.65.52-.65.94c0 .69.7 1.18 1.36.94M2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2zM22 9c.02-4-4.28-6-10-6C6.29 3 2 5 2 9c0 .55.45 1 1 1h18c.55 0 1-.45 1-1"></path>
    </svg>
  )

  const dinnerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-full mr-2">
      <path fill="currentColor"
            d="m5.44 7.96l.52-.53c.58-.58 1.54-.58 2.14.04l.02.03c.49.5 1.14.74 1.85.81c.97.09 1.91.61 2.53 1.55c.68 1.08.67 2.52-.04 3.59a3.322 3.322 0 0 1-5.18.55c-.56-.55-.88-1.26-.96-2c-.08-.73-.37-1.42-.88-1.93c-.58-.57-.58-1.53 0-2.11M9.64 16c-1.17 0-2.26-.45-3.07-1.28c-.7-.72-1.14-1.62-1.25-2.6c-.03-.3-.12-.69-.36-1.05C4.36 11.9 4 12.9 4 14c0 1.64.8 3.09 2.03 4H19v-1c0-3.6-2.39-6.65-5.66-7.65c.89 1.4.87 3.27-.04 4.65c-.8 1.25-2.18 2-3.66 2m5.14-8.44h1.27c.87 0 1.63.61 1.63 1.7V10h1.25V9c0-1.5-1.33-2.64-2.88-2.64h-1.27c-.83 0-1.54-.82-1.54-1.66s.71-1.46 1.54-1.46V2C13.24 2 12 3.24 12 4.78s1.24 2.78 2.78 2.78M4.5 7.55c.06-.1.14-.2.23-.3l.52-.52c.09-.09.19-.16.29-.23L4.13 5.07c.14-.27.09-.62-.13-.85a.767.767 0 0 0-1.07 0c-.14.14-.21.31-.22.49c-.18.01-.35.08-.49.22c-.29.29-.29.77 0 1.07c.23.22.57.27.85.13zm13.89-3.16c.51-.51.83-1.2.83-1.97h-1.25c0 .83-.7 1.53-1.53 1.53v1.24c1.86 0 3.32 1.52 3.32 3.38V11H21V8.57a4.61 4.61 0 0 0-2.61-4.18M5 21h14c1.11 0 2-.89 2-2H3a2 2 0 0 0 2 2"></path>
    </svg>
  )

  const foodIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-full mr-2">
      <path fill="currentColor"
            d="M3.743 2.816A.88.88 0 0 1 5.5 2.88v4.494a.625.625 0 1 0 1.25 0V2.75a.75.75 0 0 1 1.5 0v4.624a.625.625 0 1 0 1.25 0V2.88a.88.88 0 0 1 1.757-.064C11.3 3.428 11.5 6.37 11.5 8c0 1.35-.67 2.544-1.692 3.267c-.216.153-.268.315-.263.397c.123 1.878.455 7.018.455 7.833a2.5 2.5 0 0 1-5 0c0-.816.332-5.955.455-7.833c.005-.082-.047-.244-.263-.397A4 4 0 0 1 3.5 8c0-1.63.2-4.572.243-5.184M13 7.75A5.75 5.75 0 0 1 18.75 2a.75.75 0 0 1 .75.75v8.5c0 .318.106 1.895.225 3.642l.005.083c.13 1.908.27 3.983.27 4.522a2.5 2.5 0 0 1-5 0c0-.514.128-2.611.252-4.534c.062-.971.125-1.912.172-2.61l.023-.353h-.697A1.75 1.75 0 0 1 13 10.25z"></path>
    </svg>
  )


  return (
    <div className="flex w-3/4 m-auto gap-4 my-2">
      <div id="sidebar" className="basis-1/4">
        <ul className="menu menu-md rounded-box border border-neutral">
          <li>
            <h2 className="menu-title text-neutral-800 text-xl">CATEGORIES</h2>
            <ul className="font-bold">
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'All' ? 'active' : ''}`}
                     onClick={() => setSelectedCategory('All')}>
                {foodIcon}
                All</a></li>
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'Breakfast' ? 'active' : ''}`}
                     onClick={() => setSelectedCategory('Breakfast')}>
                {breakfastIcon}
                Breakfast</a></li>
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'Lunch' ? 'active' : ''}`}
                     onClick={() => setSelectedCategory('Lunch')}>
                {lunchIcon}
                Lunch</a></li>
              <li><a className={`transition-colors duration-200 ${selectedCategory === 'Dinner' ? 'active' : ''}`}
                     onClick={() => setSelectedCategory('Dinner')}>
                {dinnerIcon}
                Dinner</a></li>
            </ul>
          </li>
          <div className="divider m-auto my-2 w-full"></div>
          <li>
            <h2 className="menu-title text-neutral-800 text-xl">SORT BY DESCENDING ...</h2>
            <ul className="font-bold">
              <li><a onClick={() => handleSortChange('Emissions')}
                     className={`transition-colors duration-200 ${selectedSort === 'Emissions' ? 'active' : ''}`}>Emissions</a>
              </li>
              <li><a onClick={() => handleSortChange('Servings')}
                     className={`transition-colors duration-200 ${selectedSort === 'Servings' ? 'active' : ''}`}>Servings</a>
              </li>
              <li><a onClick={() => handleSortChange('Ingredients')}
                     className={`transition-colors duration-200 ${selectedSort === 'Ingredients' ? 'active' : ''}`}>Ingredients</a>
              </li>
              <li><a onClick={() => handleSortChange('Time')}
                     className={`transition-colors duration-200 ${selectedSort === 'Time' ? 'active' : ''}`}>Time</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="grow join join-vertical rounded-box">
        {recipes.filter(recipe => selectedCategory === 'All' || recipe.category === selectedCategory).map((recipe, index) => (
          <div key={index} className="collapse collapse-arrow join-item border border-neutral">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium text-neutral flex align-middle">{recipe.category === 'Breakfast' ? breakfastIcon : recipe.category === 'Lunch' ? lunchIcon : dinnerIcon} {recipe.title}</div>
            <div className="collapse-content">
              <p className="pt-4">{recipe.description}</p>
              <div className="flex justify-between text-md xl:text-xl">
                <div className="flex gap-8 basis-2/3">
                  <p className="pt-4"><span className="font-bold text-red-600">Emissions:</span> {recipe.total_emission}
                    <span className="text-sm">kgCO2</span></p>
                  <p className="pt-4"><span
                    className="font-bold text-blue-600">Total Time:</span> {recipe.prep_time + recipe.cook_time} <span
                    className="text-sm">minutes</span></p>
                  <p className="pt-4"><span className="font-bold text-green-600">Servings:</span> {recipe.servings}</p>
                </div>
                <button className="btn btn-xs sm:btn-sm md:btn-md btn-info text-info-content text-xl" onClick={() => handleRedirect(recipe.id)}>View Recipe</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
