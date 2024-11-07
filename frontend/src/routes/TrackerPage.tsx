import React, { useState } from 'react';

const TrackerPage = () => {
  // PLACEHOLDER - store food items and their emissions in grams
  const [foods, setFoods] = useState([
    { name: 'Apple', emission: 50 },
    { name: 'Banana', emission: 30 },
    { name: 'Rice', emission: 200 },
  ]);

  const [search, setSearch] = useState(''); // state to store search input

  // function to handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Track Your Carbon Emissions</h1>
      
      {/* Search input field */}
      <div className="my-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for food..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Widgets displaying daily, weekly, and total emissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold">Total Carbon Emissions (grams)</h2>
          <p className="text-2xl font-bold text-red-600">500 grams</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold">Daily Average Emissions (grams)</h2>
          <p className="text-2xl font-bold text-blue-600">70 grams</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold">Weekly Average Emissions (grams)</h2>
          <p className="text-2xl font-bold text-green-600">450 grams</p>
        </div>
      </div>

      {/* List of food items and their emissions */}
      <div className="my-8">
        <h2 className="text-2xl font-bold">Food Emissions</h2>
        <ul className="mt-4 space-y-2">
          {foods
            .filter((food) => food.name.toLowerCase().includes(search.toLowerCase())) // filter based on search input
            .map((food, index) => (
              <li key={index} className="p-4 bg-white rounded shadow">
                <span className="font-semibold">{food.name}</span>: {food.emission} grams
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackerPage;
