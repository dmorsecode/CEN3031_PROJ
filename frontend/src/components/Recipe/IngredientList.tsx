import { Key, useEffect, useState } from 'react'
import Ingredient from './Ingredient'

function IngredientList({ ingredientList, editable, addIngredient }: { ingredientList: any, editable: boolean | undefined, addIngredient: any }) {
  const [amt, setAmt] = useState(0);
  const [unit, setUnit] = useState('');
  const [ingredient, setIngredient] = useState('');

  const [ingredientsList, setIngredientList] = useState(ingredientList);

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
        <Ingredient key={index} ingredient={ingredient.ingredient} amount={ingredient.amount}
                    measurement={ingredient.measurement} perKg={ingredient.perKg} />
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
        <p className="basis-1/2 text-right">{'##'} <span className="text-sm">kgCO2 / kg</span></p>
      </div>
    </div>
  )
}

export default IngredientList
