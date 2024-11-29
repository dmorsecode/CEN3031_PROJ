import React, { useState, useEffect } from 'react';

interface Food {
  name: string;
  emission: number;
  servingSize: string;
}

// PLACEHOLDER VALUES - maybe for data we can put it in 
//    const [recipe] --> stores ingredients, carbon emission, and serving size for info popup 
const TrackerPage = () => {
  const [foods] = useState<Food[]>([
    { name: 'Apple', emission: 50, servingSize: '1 medium (182g)' },
    { name: 'Banana', emission: 30, servingSize: '1 medium (118g)' },
    { name: 'Rice', emission: 200, servingSize: '1 cup (158g)' },
  ]);

  const [search, setSearch] = useState('');
  const [dailyEmission, setDailyEmission] = useState(0);
  const [weeklyEmissions, setWeeklyEmissions] = useState<Record<string, Food[]>>({});
  const [allTimeEmissions, setAllTimeEmissions] = useState<Record<string, Food[]>>({});
  const [infoPopup, setInfoPopup] = useState<Food | null>(null); // track selected food for info popup
  const [summaryPopup, setSummaryPopup] = useState<'daily' | 'weekly' | 'allTime' | null>(null); // popup for total summaries

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    const savedDailyEmission = localStorage.getItem('dailyEmission');
    const savedWeeklyEmissions = localStorage.getItem('weeklyEmissions');
    const savedAllTimeEmissions = localStorage.getItem('allTimeEmissions');
    const lastDailyReset = localStorage.getItem('lastDailyReset');

    const today = getTodayDate();

    if (lastDailyReset !== today) {
      setDailyEmission(0); // resets emission every day
      localStorage.setItem('lastDailyReset', today);
    } else if (savedDailyEmission) {
      setDailyEmission(Number(savedDailyEmission));
    }

    if (savedWeeklyEmissions) {
      setWeeklyEmissions(JSON.parse(savedWeeklyEmissions));
    }
    if (savedAllTimeEmissions) {
      setAllTimeEmissions(JSON.parse(savedAllTimeEmissions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dailyEmission', String(dailyEmission));
    localStorage.setItem('weeklyEmissions', JSON.stringify(weeklyEmissions));
    localStorage.setItem('allTimeEmissions', JSON.stringify(allTimeEmissions));
  }, [dailyEmission, weeklyEmissions, allTimeEmissions]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddEmission = (food: Food) => {
    const today = getTodayDate(); 
    setDailyEmission((prev) => prev + food.emission);

    setWeeklyEmissions((prev) => ({
      ...prev,
      [today]: [...(prev[today] || []), food],
    }));

    setAllTimeEmissions((prev) => ({
      ...prev,
      [today]: [...(prev[today] || []), food],
    }));
  };

  const handleDeleteDailyItem = (index: number) => {
    const today = getTodayDate();
    if (weeklyEmissions[today]) {
      const newDailyList = [...weeklyEmissions[today]];
      const deletedItem = newDailyList.splice(index, 1)[0];
      setDailyEmission((prev) => prev - deletedItem.emission);
      setWeeklyEmissions((prev) => ({ ...prev, [today]: newDailyList }));
      setAllTimeEmissions((prev) => ({ ...prev, [today]: newDailyList }));
    }
  };

  // BUTTON FOR TESTING PURPOSES - should be removed for final product 
  const handleReset = () => {
    setDailyEmission(0);
    setWeeklyEmissions({});
    setAllTimeEmissions({});
    localStorage.setItem('lastDailyReset', getTodayDate());
  };

  const getTotalEmissionForPeriod = (emissions: Record<string, Food[]>) => {
    return Object.values(emissions)
      .flat()
      .reduce((total, food) => total + food.emission, 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Track Your Carbon Emissions</h1>
      
      {/* search field */}
      <div className="my-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* emissions widgets w/ summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div onClick={() => setSummaryPopup('daily')} className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer">
          <h2 className="text-xl font-bold">Total Carbon Emissions Today (grams)</h2>
          <p className="text-2xl font-bold text-red-600">{dailyEmission} grams</p>
        </div>
        <div onClick={() => setSummaryPopup('weekly')} className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer">
          <h2 className="text-xl font-bold">Total Carbon Emissions Last 7 Days (grams)</h2>
          <p className="text-2xl font-bold text-blue-600">
            {getTotalEmissionForPeriod(weeklyEmissions)} grams
          </p>
        </div>
        <div onClick={() => setSummaryPopup('allTime')} className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer">
          <h2 className="text-xl font-bold">All-Time Carbon Emissions (grams)</h2>
          <p className="text-2xl font-bold text-green-600">
            {getTotalEmissionForPeriod(allTimeEmissions)} grams
          </p>
        </div>
      </div>
      

      
      {/* food/recipe list - TO BE CHANGED W ACTUAL DATA*/} 
      {/* for longer recipe lists, this will need pages + arrow to go through them*/}
      <div className="my-8">
        <h2 className="text-2xl font-bold">Food Emissions</h2>
        <ul className="mt-4 space-y-2">
          {foods
            .filter((food) => food.name.toLowerCase().includes(search.toLowerCase()))
            .map((food, index) => (
              <li key={index} className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-200">
                <span className="font-semibold">{food.name}</span>: {food.emission} grams
                <div className="mt-2">
                  <button onClick={() => handleAddEmission(food)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Track
                  </button>
                  <button onClick={() => setInfoPopup(food)} className="px-3 py-1 bg-gray-500 text-white rounded">
                    More Info
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* reset button - TO BE REMOVED*/}
      <button onClick={handleReset} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Reset Totals
      </button>

      {/* info popup */}
      {infoPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-80">
            <button onClick={() => setInfoPopup(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              X
            </button>
            <h2 className="text-xl font-bold">{infoPopup.name} Info</h2>
            <p>Serving Size: {infoPopup.servingSize}</p>
            <p>Carbon Emission: {infoPopup.emission} grams</p>
            {/* additional information can be added here - FOR RECIPES, serving size + ingredients */}
          </div>
        </div>
      )}

      {/* total summary popup */}
      {summaryPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-80 overflow-auto">
            <button onClick={() => setSummaryPopup(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              X
            </button>
            <h2 className="text-xl font-bold">Emissions Summary - {summaryPopup}</h2>
            {summaryPopup === 'daily' && (
              <ul className="mt-4 space-y-2">
                {(weeklyEmissions[getTodayDate()] || []).map((food, index) => (
                  <li key={index} className="p-2 bg-gray-100 rounded shadow flex justify-between">
                    <span>{food.name}: {food.emission} grams</span>
                    <button onClick={() => handleDeleteDailyItem(index)} className="text-red-500 hover:underline">Delete</button>
                  </li>
                ))}
              </ul>
            )}
            {(summaryPopup === 'weekly' || summaryPopup === 'allTime') && (
              <div className="mt-4 space-y-4">
                {Object.entries(summaryPopup === 'weekly' ? weeklyEmissions : allTimeEmissions).map(([date, foods]) => (
                  <div key={date}>
                    <h3 className="font-semibold">{date}</h3>
                    <ul className="space-y-1">
                      {foods.map((food, idx) => (
                        <li key={idx} className="pl-2">{food.name}: {food.emission} grams</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackerPage;
