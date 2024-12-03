import { useEffect, useState } from 'react';

const HomePage = () => {
  const [dailyEmission, setDailyEmission] = useState(0);
  const [dailyTrackedRecipes, setDailyTrackedRecipes] = useState(0);

  useEffect(() => {
    const savedDailyEmission = localStorage.getItem('dailyEmission');
    const savedDailyTrackedRecipes = localStorage.getItem('dailyTrackedRecipes');

    if (savedDailyEmission) setDailyEmission(Number(savedDailyEmission));
    if (savedDailyTrackedRecipes) setDailyTrackedRecipes(Number(savedDailyTrackedRecipes));
  }, []);

  return (
    <div className="relative overflow-y-auto h-screen bg-white">
      <div className="sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Your Carbon Emission Recipe Manager and Tracker
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Track your daily carbon footprint and make sustainable food choices.
            </p>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Total Carbon Emissions Today</h2>
                <p className="text-2xl font-bold text-green-600">{dailyEmission} grams</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Daily Average Carbon Emissions</h2>
                <p className="text-2xl font-bold text-blue-600">
                  {dailyTrackedRecipes > 0 ? (dailyEmission / dailyTrackedRecipes).toFixed(2) : 0} grams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
