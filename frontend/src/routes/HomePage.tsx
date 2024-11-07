import Avatar from 'components/Avatar';
import logo from 'assets/logo.svg';

function HomePage() {
  return (
    <div className="relative overflow-y-auto h-screen bg-white"> 
      <div className="sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">

          {/* Header section with logo and welcome message */}
          <div className="sm:max-w-lg">
            <div className="my-4">
              <Avatar size="large" src={logo} /> {/* Logo */}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Your Food Carbon Emission Tracker
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Track your daily carbon footprint and make sustainable food choices.
            </p>
          </div>
          {/* Widgets displaying user statistics */}
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Total Carbon Emissions Today</h2>
                <p className="text-2xl font-bold text-green-600">300 grams</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Daily Average Carbon Emissions</h2>
                <p className="text-2xl font-bold text-blue-600">280 grams</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Weekly Average Carbon Emissions</h2>
                <p className="text-2xl font-bold text-yellow-600">250 grams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
