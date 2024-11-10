function RecipeInfo({title, description, prep, cook, servings} : {title: string, description: string, prep: number, cook: number, servings: number}) {
    return (
      <div className="flex flex-col w-full items-center justify-center p-2 h-full">
        <h2 className="text-2xl">{title}</h2>
        <div className="flex-col items-center hidden md:flex h-full w-full">
          <div className="divider divider-neutral opacity-50 w-full m-2 hidden lg:flex" />
          <p className="w-full grow text-lg hidden lg:flex items-center justify-center text-center p-2">{description}</p>
          <div className="divider divider-neutral opacity-50 w-full m-2 hidden lg:flex" />
        </div>
        <div className="flex justify-between text-lg text-center font-bold gap-y-1">
          <p>Prep Time: {prep}min</p>
          <div className="divider divider-neutral opacity-50 divider-horizontal" />
          <p>Cook Time: {cook}min</p>
          <div className="divider divider-neutral opacity-50 divider-horizontal" />
          <p>Servings: {servings}</p>
        </div>
      </div>
    );
}

export default RecipeInfo
