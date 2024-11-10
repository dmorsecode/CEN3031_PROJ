function RecipeInfo({title, description, prep, cook, servings, editable} : {title: string, description: string, prep: number, cook: number, servings: number, editable: boolean | undefined}) {
    return (
      <div className="flex flex-col w-full items-center justify-center p-2 h-full">
        <h2 className={`text-2xl ${editable ? 'border-2 border-neutral-400 border-dashed p-2 rounded-sm' : ''} ${title ? '' : 'opacity-50'}`} contentEditable={editable}>{title ?? 'Untitled Recipe'}</h2>
        <div className="flex-col items-center hidden md:flex h-full w-full">
          <div className="divider divider-neutral opacity-50 w-full m-y-2 hidden lg:flex" />
          <p className={`w-full grow text-lg hidden lg:flex items-center justify-center text-center ${editable ? 'border-2 border-neutral-400 border-dashed p-2 rounded-sm' : ''} ${description ? '' : 'opacity-50'}`} contentEditable={editable}>{description ?? "Write a description for your recipe here."}</p>
          <div className="divider divider-neutral opacity-50 w-full m-y-2 hidden lg:flex" />
        </div>
        <div className="flex justify-between text-lg text-center font-bold gap-y-1">
          <p>Prep Time: <span contentEditable={editable} className={`${editable ? 'border-2 border-neutral-400 border-dashed px-2 rounded-sm' : ''} ${prep ? '' : 'opacity-50'}`}>{prep ?? 0}</span> min</p>
          <div className="divider divider-neutral opacity-50 divider-horizontal" />
          <p>Cook Time: <span contentEditable={editable} className={`${editable ? 'border-2 border-neutral-400 border-dashed px-2 rounded-sm' : ''} ${cook ? '' : 'opacity-50'}`}>{cook ?? 0}</span> min</p>
          <div className="divider divider-neutral opacity-50 divider-horizontal" />
          <p>Servings: <span contentEditable={editable} className={`${editable ? 'border-2 border-neutral-400 border-dashed px-2 rounded-sm' : ''} ${servings ? '' : 'opacity-50'}`}>{servings ?? 1}</span></p>
        </div>
      </div>
    );
}

export default RecipeInfo
