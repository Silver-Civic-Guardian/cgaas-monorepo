import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [selectedWard, setSelectedWard] = useState('taipei-daan');
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchThreats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/threats/ward/${selectedWard}`);
      if (!response.ok) {
        throw new Error('Failed to fetch threats');
      }
      const data = await response.json();
      setThreats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, [selectedWard]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
              CG
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Civic Guardian Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="ward-select" className="text-sm font-medium text-gray-700">
                Ward:
              </label>
              <select
                id="ward-select"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="block w-48 rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="taipei-daan">Da'an District, Taipei</option>
                <option value="taipei-xinyi">Xinyi District, Taipei</option>
                <option value="taipei-zhongshan">Zhongshan District, Taipei</option>
              </select>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor community reports and threats for {selectedWard === 'taipei-daan' ? "Da'an District" : selectedWard === 'taipei-xinyi' ? "Xinyi District" : "Zhongshan District"}.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Reports (Today)</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Active Threats</dt>
              <dd className="mt-1 text-3xl font-semibold text-red-600">3</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Resolved (This Week)</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">142</dd>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Top Threats & Issues</h3>
              <p className="mt-1 text-sm text-gray-500">Recent high-priority reports requiring attention.</p>
            </div>
            <button
              onClick={fetchThreats}
              disabled={loading}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 border-b border-red-100">
              Error: {error}
            </div>
          )}
          <ul className="divide-y divide-gray-200">
            {threats.length === 0 && !loading && !error ? (
              <li className="px-4 py-8 text-center text-sm text-gray-500">No threats found for this ward.</li>
            ) : (
              threats.map((threat, index) => (
                <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-blue-600 truncate">{threat.intent}</p>
                      <p className="text-sm text-gray-500 mt-1">Trending Issue</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Count: {threat.count}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
