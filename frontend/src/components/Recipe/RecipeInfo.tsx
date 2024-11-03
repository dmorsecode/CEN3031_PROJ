function RecipeInfo() {
    return (
      <div className="flex flex-col w-full items-center justify-center p-2">
        <h2 className="text-2xl">Recipe Name</h2>
        <div className="flex-col items-center hidden md:flex">
          <div className="divider divider-neutral opacity-50 w-full m-0" />
          <p className="w-full text-justify text-xs xl:text-sm hidden lg:inline">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
          <div className="divider divider-neutral opacity-50 w-full m-0" />
        </div>
        <div className="hidden lg:flex justify-between text-sm text-center font-bold gap-y-1">
          <p>Prep Time: 50min</p>
          <div className="divider divider-neutral opacity-50 divider-horizontal" />
          <p>Cook Time: 50min</p>
          <div className="divider divider-neutral opacity-50 divider-horizontal" />
          <p>Servings: 4</p>
        </div>
      </div>
    );
}

export default RecipeInfo
