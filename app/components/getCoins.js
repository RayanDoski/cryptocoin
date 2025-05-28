'use client';
// components/MostVisitedCoins.js
import { useState, useEffect } from 'react';

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
    <div className="most-visited-container">
      <h2>Most Visited Cryptocurrencies</h2>
      
      <div className="controls">
        <div>
          <label>Time Period:</label>
          <select 
            value={params.time_period} 
            onChange={(e) => handleParamChange('time_period', e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        
        <div>
          <label>Results Limit:</label>
          <input 
            type="number" 
            min="1" 
            max="100" 
            value={params.limit}
            onChange={(e) => handleParamChange('limit', e.target.value)}
          />
        </div>
      </div>

      {data?.data?.length > 0 ? (
        <div className="coins-grid">
          {data.data.map(coin => (
            <div key={coin.id} className="coin-card">
              <h3>{coin.name} ({coin.symbol})</h3>
              <p>Rank: #{coin.cmc_rank}</p>
              <p>Price: ${coin.quote?.USD?.price?.toFixed(2) || 'N/A'}</p>
              <p>24h Change: {coin.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%</p>
              <p>Market Cap: ${(coin.quote?.USD?.market_cap / 1000000000)?.toFixed(2) || 'N/A'}B</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}