import React, { useState, useEffect } from 'react';

interface Recipe {
  id: number;
  title: string;
  total_emission: number;
  serving_size: string;
}

const TrackerPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [dailyEmission, setDailyEmission] = useState(0);
  const [dailyTrackedRecipes, setDailyTrackedRecipes] = useState<number>(0);
  const [infoPopup, setInfoPopup] = useState<Recipe | null>(null);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchData();
    const savedDailyEmission = localStorage.getItem('dailyEmission');
    const savedDailyTrackedRecipes = localStorage.getItem('dailyTrackedRecipes');
    const lastDailyReset = localStorage.getItem('lastDailyReset');
    const today = getTodayDate();

    if (lastDailyReset !== today) {
      setDailyEmission(0);
      setDailyTrackedRecipes(0);
      localStorage.setItem('lastDailyReset', today);
    } else {
      if (savedDailyEmission) setDailyEmission(Number(savedDailyEmission));
      if (savedDailyTrackedRecipes) setDailyTrackedRecipes(Number(savedDailyTrackedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dailyEmission', String(dailyEmission));
    localStorage.setItem('dailyTrackedRecipes', String(dailyTrackedRecipes));
  }, [dailyEmission, dailyTrackedRecipes]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://134.209.114.122:8000/get_recipe_list/');
      const data = await response.json();
      const processedRecipes = data.recipes.map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        total_emission: recipe.total_emission,
        serving_size: recipe.servings + ' servings',
      }));
      setRecipes(processedRecipes);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddEmission = (recipe: Recipe) => {
    setDailyEmission((prev) => prev + recipe.total_emission);
    setDailyTrackedRecipes((prev) => prev + 1);
  };

  const handleResetDailyTotals = () => {
    setDailyEmission(0);
    setDailyTrackedRecipes(0);
    localStorage.setItem('dailyEmission', '0');
    localStorage.setItem('dailyTrackedRecipes', '0');
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Track Your Carbon Emissions</h1>

      <div className="my-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold">Total Carbon Emissions Today (grams)</h2>
          <p className="text-2xl font-bold text-red-600">{dailyEmission} grams</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold">Daily Average Carbon Emissions (grams)</h2>
          <p className="text-2xl font-bold text-blue-600">
            {dailyTrackedRecipes > 0 ? (dailyEmission / dailyTrackedRecipes).toFixed(2) : 0} grams
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold">Recipes Tracked Today</h2>
          <p className="text-2xl font-bold text-green-600">{dailyTrackedRecipes}</p>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold">Recipe Emissions</h2>
        <ul className="mt-4 space-y-2">
          {recipes
            .filter((recipe) => recipe.title.toLowerCase().includes(search.toLowerCase()))
            .map((recipe) => (
              <li key={recipe.id} className="p-4 bg-white rounded shadow">
                <span className="font-semibold">{recipe.title}</span>: {recipe.total_emission} grams
                <div className="mt-2">
                  <button
                    onClick={() => handleAddEmission(recipe)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Track
                  </button>
                  <button
                    onClick={() => setInfoPopup(recipe)}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    More Info
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {infoPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-80">
            <button
              onClick={() => setInfoPopup(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              X
            </button>
            <h2 className="text-xl font-bold">{infoPopup.title} Info</h2>
            <p>Serving Size: {infoPopup.serving_size}</p>
            <p>Carbon Emission: {infoPopup.total_emission} grams</p>
          </div>
        </div>
      )}

      <button
        onClick={handleResetDailyTotals}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Totals for Today
      </button>
    </div>
  );
};

export default TrackerPage;
