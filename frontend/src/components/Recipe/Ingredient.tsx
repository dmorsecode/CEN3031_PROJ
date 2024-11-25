function Ingredient({ ingredient, amount, measurement, perKg }: { ingredient: string, amount: number, measurement: string, perKg: string }) {
  return (
    <div className="w-full flex hover:scale-[101%] duration-200">
      <div className="basis-1/2">
        <p>{amount} {measurement} {ingredient}</p>
      </div>
      <p className={`basis-1/2 text-right ${perKg == "0.00" ? 'hidden' : ''}`}>{perKg} <span className="text-sm">kgCO2</span></p>
    </div>
  )
}

export default Ingredient
