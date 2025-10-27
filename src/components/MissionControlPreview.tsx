import React from 'react';

const MissionControlPreview: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col space-y-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Mission Control Dashboard</h2>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Active</span>
          <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Incident Map</h3>
          <div className="bg-gray-600 h-40 rounded-md flex items-center justify-center text-gray-400">
            Map Placeholder
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Live Feed</h3>
          <div className="bg-gray-600 h-40 rounded-md flex items-center justify-center text-gray-400">
            Video/Text Feed Placeholder
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Active Dispatches</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                <th className="py-2 px-4 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                <th className="py-2 px-4 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                <th className="py-2 px-4 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 whitespace-nowrap">#001</td>
                <td className="py-2 px-4 whitespace-nowrap">Medical</td>
                <td className="py-2 px-4 whitespace-nowrap">Main St.</td>
                <td className="py-2 px-4 whitespace-nowrap text-yellow-400">En Route</td>
              </tr>
              <tr>
                <td className="py-2 px-4 whitespace-nowrap">#002</td>
                <td className="py-2 px-4 whitespace-nowrap">Fire</td>
                <td className="py-2 px-4 whitespace-nowrap">Elm Ave.</td>
                <td className="py-2 px-4 whitespace-nowrap text-red-400">Dispatched</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MissionControlPreview;
