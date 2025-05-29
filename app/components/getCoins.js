'use client';
// components/MostVisitedCoins.js
import { useState, useEffect } from 'react';
import InvestPopup from './popup/investPopup';

export default function MostVisitedCoins() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    start: 1,
    limit: 10,
    time_period: '24h',
    convert: 'USD'
  });

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

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div>Loading most visited coins...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="most-visited-container p-4 md:p-6 lg:p-8 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Most Visited Cryptocurrencies</h2>
      
      <div className="controls flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-sm sm:text-base font-medium text-gray-700">Time Period:</label>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            value={params.time_period} 
            onChange={(e) => handleParamChange('time_period', e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-sm sm:text-base font-medium text-gray-700">Results Limit:</label>
          <input 
            type="number" 
            min="1" 
            max="100" 
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base w-20"
            value={params.limit}
            onChange={(e) => handleParamChange('limit', e.target.value)}
          />
        </div>
      </div>

      {/* onClick={() => { handleClosePopup; setSpecifikCoin(coin) }} */}
      {showPopup && <InvestPopup onClose={handleClosePopup} coin={specifikCoin}/>}
      
      {data?.data?.length > 0 ? (
        <div className="coins-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.data.map(coin => (
            <div onClick={() => { setShowPopup(!showPopup); setSpecifikCoin(coin)}} key={coin.id} className="coin-card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{coin.name} <span className="text-gray-500">({coin.symbol})</span></h3>
              <p className="text-sm text-gray-600 mb-1">Rank: <span className="font-medium">#{coin.cmc_rank}</span></p>
              <p className="text-sm text-gray-600 mb-1">Price: <span className="font-medium">${coin.quote?.USD?.price?.toFixed(2) || 'N/A'}</span></p>
              <p className={`text-sm mb-1 ${coin.quote?.USD?.percent_change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                24h Change: <span className="font-medium">{coin.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%</span>
              </p>
              <p className="text-sm text-gray-600">Market Cap: <span className="font-medium">${(coin.quote?.USD?.market_cap / 1000000000)?.toFixed(2) || 'N/A'}B</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No data available</p>
      )}
    </div>
  );
}