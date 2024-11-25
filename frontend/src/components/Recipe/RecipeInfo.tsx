import { useEffect, useState } from 'react'

function RecipeInfo({ title, category, description, prep, cook, servings, editable, modifyServings }: {
  title: string,
  category: string,
  description: string,
  prep: number,
  cook: number,
  servings: number,
  editable: boolean | undefined,
  modifyServings: any
}) {
  const [titleView, setTitle] = useState(title)
  const [descriptionView, setDescription] = useState(description)
  const [prepView, setPrep] = useState(prep)
  const [cookView, setCook] = useState(cook)
  const [servingsView, setServings] = useState(servings)
  const [categoryView, setCategory] = useState(category)

  function changeServings(multiplier: number) {
    if (servingsView + multiplier < 1) return;
    setServings(servingsView + multiplier)
    modifyServings(multiplier)
  }

  if (editable) return (
    <div className="flex flex-col w-full items-center justify-center p-2 h-full">
      <div className="flex gap-x-4">
        <input type="text" placeholder="Recipe Name"
               onChange={(e) => setTitle(e.currentTarget.value)}
               className={`text-2xl text-center border-2 border-neutral-400 border-dashed p-2 rounded-sm ${titleView ? '' : 'opacity-50'}`} />
        <select defaultValue="Category" className="select select-bordered h-full" id="categorySelector"
                onChange={(e) => setCategory(e.target.value)}>
          <option disabled>Category</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </div>
      <div className="flex-col items-center hidden md:flex h-full w-full">
        <div className="divider divider-neutral opacity-50 w-full m-y-2 hidden lg:flex" />
        <input type="text" placeholder="Write a description for your recipe here."
               onChange={(e) => setDescription(e.currentTarget.value)}
               className={`w-full grow text-lg hidden lg:flex items-center justify-center text-center border-2 border-neutral-400 border-dashed p-2 rounded-sm ${descriptionView ? '' : 'opacity-50'}`} />
        <div className="divider divider-neutral opacity-50 w-full m-y-2 hidden lg:flex" />
      </div>
      <div className="flex text-lg text-center font-bold">
        <div className="flex basis-1/3 gap-2 items-center justify-center">
          <p>Prep Time:</p>
          <input type="text" placeholder="0"
                 onChange={(e) => setPrep(parseInt(e.currentTarget.value))}
                 className={`w-1/4 text-center border-2 border-neutral-400 border-dashed px-2 rounded-sm ${prepView ? '' : 'opacity-50'}`} />
          <p>min</p>
        </div>
        <div className="divider divider-neutral opacity-50 divider-horizontal !m-0" />
        <div className="flex basis-1/3 gap-2 items-center justify-center">
          <p>Prep Time:</p>
          <input type="text" placeholder="0"
                 onChange={(e) => setCook(parseInt(e.currentTarget.value))}
                 className={`w-1/4 text-center border-2 border-neutral-400 border-dashed px-2 rounded-sm ${cookView ? '' : 'opacity-50'}`} />
          <p>min</p>
        </div>
        <div className="divider divider-neutral opacity-50 divider-horizontal !m-0" />
        <div className="flex basis-1/3 gap-2 items-center justify-center">
          <p>Prep Time:</p>
          <input type="text" placeholder="0"
                 onChange={(e) => setServings(parseInt(e.currentTarget.value))}
                 className={`w-1/4 text-center border-2 border-neutral-400 border-dashed px-2 rounded-sm ${servingsView ? '' : 'opacity-50'}`} />
          <p>min</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col w-full items-center justify-center p-2 h-full">
      <h2
        className={`text-2xl`}>{title ?? 'Untitled Recipe'}</h2>
      <div className="flex-col items-center hidden md:flex h-full w-full">
        <div className="divider divider-neutral opacity-50 w-full m-y-2 hidden lg:flex" />
        <p
          className={`w-full grow text-lg hidden lg:flex items-center justify-center text-center`}
        >{description ?? 'No description.'}</p>
        <div className="divider divider-neutral opacity-50 w-full m-y-2 hidden lg:flex" />
      </div>
      <div className="flex justify-between text-lg text-center font-bold gap-y-1">
        <p>Prep Time: <span>{prep ?? 0}</span> min
        </p>
        <div className="divider divider-neutral opacity-50 divider-horizontal" />
        <p>Cook Time: <span>{cook ?? 0}</span> min
        </p>
        <div className="divider divider-neutral opacity-50 divider-horizontal" />
        <p>
          <button className="btn btn-xs rounded-box btn-neutral mr-2" disabled={servingsView <= 1} onClick={() => changeServings(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"></path>
            </svg>
          </button>
          Servings: <span>{servingsView ?? 1}</span>
          <button className="btn btn-xs rounded-box btn-neutral ml-2" onClick={() => changeServings(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
                    className="h-full"></path>
            </svg>
          </button>
        </p>
      </div>
    </div>
  )
}

export default RecipeInfo
