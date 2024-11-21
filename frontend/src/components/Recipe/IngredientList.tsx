import { Key, useEffect, useState } from 'react'
import Ingredient from './Ingredient'

function IngredientList({ ingredientList, editable, addIngredient, servings, servingsMultiplier }: { ingredientList: any, editable: boolean | undefined, addIngredient: any, servings: number, servingsMultiplier: number }) {
  const [amt, setAmt] = useState(0);
  const [unit, setUnit] = useState('');
  const [ingredient, setIngredient] = useState('');

  const [ingredientsList, setIngredientList] = useState(ingredientList);

  function calculateTotal() {
    // calculate total emissions of all ingredients while accounting for serving size
    let total = 0;
    ingredientList.forEach((ingredient: {
      ingredient: string;
      amount: number;
      measurement: string;
      perKg: number
    }) => {
      total += ingredient.perKg * (ingredient.amount / servings * servingsMultiplier);
    });
    return total;
  }

  useEffect(() => {
    setIngredientList(ingredientList);
  }, [ingredientList])

  return (
    <div className="text-md xl:text-lg flex flex-col gap-2" key={ingredientList.length}>
      {ingredientsList.map((ingredient: {
        ingredient: string;
        amount: number;
        measurement: string;
        perKg: number
      }, index: Key) => (
        <Ingredient key={index} ingredient={ingredient.ingredient} amount={ingredient.amount / servings * servingsMultiplier}
                    measurement={ingredient.measurement} perKg={(ingredient.perKg * (ingredient.amount / servings * servingsMultiplier)).toFixed(2)} />
      ))}
      <div className={`w-full flex gap-1 items-center ${editable ? '' : 'hidden'}`}>
        <input type="text" placeholder="1" className={`border-2 border-neutral-400 border-dashed p-2 text-center rounded-sm input w-1/5`} id="amtSelector" onChange={(e) => setAmt(parseInt(e.currentTarget.value))} />
        <select defaultValue="Unit" className="select select-bordered w-fit" id="unitSelector" onChange={(e) => setUnit(e.target.value)}>
          <option disabled>Unit</option>
          <option>Kg</option>
          <option>Liter</option>
        </select>
        <select defaultValue="Ingredient" className="select select-bordered w-full grow" id="ingredientSelector" onChange={(e) => setIngredient(e.target.value)}>
          <option disabled>Ingredient</option>
          <option>Salmon</option>
          <option>Apple</option>
          <option>Chocolate Bar</option>
        </select>
        <button onClick={() => addIngredient(amt, unit, ingredient)} className="btn btn-square btn-ghost !p-0 text-4xl !flex flex-col">
          <p>+</p>
        </button>
      </div>
      <div className={`divider w-full m-auto ${editable ? 'hidden' : ''}`} />
      <div className={`w-full flex hover:scale-[101%] duration-200 ${editable ? 'hidden' : ''}`}>
        <p className="basis-1/2">Total Emissions</p>
        <p className="basis-1/2 text-right">{calculateTotal()} <span className="text-sm">kgCO2</span></p>
      </div>
    </div>
  )
}

export default IngredientList
