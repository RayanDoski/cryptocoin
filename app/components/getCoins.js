'use client';
// components/MostVisitedCoins.js
import { useState, useEffect } from 'react';
import InvestPopup from './popup/investPopup';

export default function MostVisitedCoins() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // för parametararna
  const [params, setParams] = useState({
    start: 1,
    limit: 10,
    time_period: '24h',
    convert: 'USD'
  });

  // För att vis popup med den specifika coinen som clickats på
  const [showPopup, setShowPopup] = useState(false);
  const [specifikCoin, setSpecifikCoin] = useState(null);

  const handleClosePopup = () => {
    setShowPopup(!showPopup);
  }

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams(params);
      const response = await fetch(`/api/coins?${query.toString()}`, { cache: 'no-store' })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }

      const result = await response.json();
      setData(result);

    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // kör automatiskt i början och när parametrarna ändras
  useEffect(() => {
    fetchData();
  }, [params]);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  // Retunera olika html layouts baserat på svar
  if (loading) return <div>Loading most visited coins...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="p-4 md:p-8 bg-gray-900 rounded-lg shadow-xl border border-gray-800">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center">Most Visited Cryptocurrencies</h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="text-base font-medium text-gray-300">Time Period:</label>
          <select
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base text-white appearance-none transition-colors duration-200"
            value={params.time_period}
            onChange={(e) => handleParamChange('time_period', e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="text-base font-medium text-gray-300">Results Limit:</label>
          <input
            type="number"
            min="1"
            max="100"
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base text-white w-24 transition-colors duration-200"
            value={params.limit}
            onChange={(e) => handleParamChange('limit', e.target.value)}
          />
        </div>
      </div>

      {showPopup && <InvestPopup onClose={handleClosePopup} coin={specifikCoin} />}

      {data?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 cursor-pointer">
          {data.data.map(coin => (
            <div
              onClick={() => { setShowPopup(!showPopup); setSpecifikCoin(coin) }}
              key={coin.id}
              className="p-5 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{coin.name} <span className="text-gray-400">({coin.symbol})</span></h3>
              <p className="text-sm text-gray-400 mb-1">Rank: <span className="font-medium text-gray-300">#{coin.cmc_rank}</span></p>
              <p className="text-sm text-gray-400 mb-1">Price: <span className="font-medium text-white">${coin.quote?.USD?.price?.toFixed(2) || 'N/A'}</span></p>
              <p className={`text-sm mb-1 ${coin.quote?.USD?.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                24h Change: <span className="font-medium">{coin.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%</span>
              </p>
              <p className="text-sm text-gray-400">Market Cap: <span className="font-medium text-gray-300">${(coin.quote?.USD?.market_cap / 1000000000)?.toFixed(2) || 'N/A'}B</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8 text-lg">No data available</p>
      )}
    </div>
  );
}