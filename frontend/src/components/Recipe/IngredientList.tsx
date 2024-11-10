import { Key } from 'react'
import Ingredient from './Ingredient'

function IngredientList({ ingredientList }: { ingredientList: any }) {
  return (
    <div className="text-md xl:text-lg flex flex-col gap-2">
      {ingredientList.map((ingredient: { ingredient: string; amount: number; measurement: string; perKg: number }, index: Key) => (
        <Ingredient key={index} ingredient={ingredient.ingredient} amount={ingredient.amount}
                    measurement={ingredient.measurement} perKg={ingredient.perKg} />
      ))}
      <div className="divider w-full m-auto" />
      <div className="w-full flex hover:scale-[101%] duration-200">
        <p className="basis-1/2">Total Emissions</p>
        <p className="basis-1/2 text-right">{"##"} <span className="text-sm">kgCO2 / kg</span></p>
      </div>
    </div>
  )
}

export default IngredientList
