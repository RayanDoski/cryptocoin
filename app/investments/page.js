'use client';
import Header from '@/app/components/header';
import { useEffect, useState } from 'react';
import Spinner from '../components/spinner/spinner';

export default function Investments() {
  const [coinData, setCoinData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for available balance, initialized to 0
  const [availableBalance, setAvailableBalance] = useState(0);
  const [investments, setInvestments] = useState([]);

  // Load user data from localStorage
  useEffect(() => {
    const fetchInvestmentsAndCoins = async () => {
      try {
        // Only access localStorage on the client side
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        const investmentsRaw = localStorage.getItem('Investments');
        const loadedInvestments = investmentsRaw ? JSON.parse(investmentsRaw) : [];
        setInvestments(loadedInvestments); // Set investments state

        const balanceRaw = localStorage.getItem('Amount');
        setAvailableBalance(Number(balanceRaw) || 0); // Set available balance state

        // If no investments, stop loading
        if (!loadedInvestments.length) {
          setLoading(false);
          return;
        }

        // Get unique symbols from investments
        const uniqueSymbols = [...new Set(loadedInvestments.map(inv => inv.coinSymbol))];

        const requests = uniqueSymbols.map(symbol =>
          fetch(`/api/coins/getOneCoinValue?&symbols=${symbol}`)
        );

        const responses = await Promise.all(requests);

        const dataResponses = await Promise.all(
          responses.map(async res => {
            if (!res.ok) throw new Error('Failed to fetch coin data');
            return res.json();
          })
        );

        const allCoinData = {};
        dataResponses.forEach(data => {
          const symbol = Object.keys(data.data)[0];
          allCoinData[symbol] = data.data[symbol][0];
        });

        setCoinData(allCoinData);

      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentsAndCoins();
  }, []); // Empty dependency array means this runs once on mount

  if (error) return <p>Error: {error}</p>;

  const handleSell = (investment, index) => {
    // Ensure all browser APIs are accessed on the client
    if (typeof window === 'undefined') return;

    const coinSymbol = investment.coinSymbol;
    const amountToSell = investment.coinsBought;
    const sellValue = (coinData[coinSymbol]?.quote?.USD?.price * amountToSell).toFixed(2);

    // Use window.confirm for client-side interaction
    const confirmSell = window.confirm(
      `Are you sure you want to sell ${amountToSell} ${coinSymbol} for $${sellValue}?`
    );

    if (!confirmSell) return;

    // Update investments in state and localStorage
    const updatedInvestments = [...investments];
    updatedInvestments.splice(index, 1);
    localStorage.setItem('Investments', JSON.stringify(updatedInvestments));
    setInvestments(updatedInvestments); // Update state

    // Update balance in state and localStorage
    let currentBalance = parseFloat(localStorage.getItem('Amount') || '0');
    currentBalance += parseFloat(sellValue);
    localStorage.setItem('Amount', currentBalance.toFixed(2));
    setAvailableBalance(currentBalance); // Update state

    setLoading(true);

    // Reload the page on the client
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };


  return (
    <>
      {loading && <Spinner />}
      <Header />
      <section className="min-h-screen relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,0.1))]"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Your Investments</h1>
            <h2 className="text-base sm:text-lg lg:text-xl text-gray-700 ml-0 md:ml-2">
              <span className='font-bold text-gray-800'>Available Balance:</span> <span className="text-gray-900">${availableBalance.toFixed(2)}</span>
            </h2>
          </div>

          {investments.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.map((investment, index) => {
                const coin = coinData[investment.coinSymbol];
                const price = coin?.quote?.USD?.price?.toFixed(2) || 'N/A';
                const totalValue = coin && investment.coinsBought
                  ? (coin.quote.USD.price * investment.coinsBought).toFixed(2)
                  : 'N/A';

                const amountInvested = investment.amountInvested || 0;
                const totalValueNum = coin && investment.coinsBought
                  ? (coin.quote.USD.price * investment.coinsBought)
                  : 0;

                const percentageChange = amountInvested > 0
                  ? ((totalValueNum - amountInvested) / amountInvested) * 100
                  : 0;

                const isPositive = percentageChange >= 0;

                return (
                  <li key={index} className="bg-gray-100 rounded-xl shadow-lg border border-gray-700 p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{investment.coinName} <span className="text-gray-500 text-base">({investment.coinSymbol})</span></h2>
                      <p className="text-sm sm:text-base text-gray-700 mb-1"><span className='font-semibold text-gray-800'>Current Price:</span> <span className="text-gray-900">${price}</span></p>
                      <p className="text-sm sm:text-base text-gray-700 mb-1"><span className='font-semibold text-gray-800'>Amount of Coins:</span> <span className="text-gray-900">{investment.coinsBought}</span></p>
                      <p className="text-sm sm:text-base text-gray-700 mb-1"><span className='font-semibold text-gray-800'>Total Value:</span> <span className="text-gray-900">${totalValue}</span></p>
                      <p className="text-sm sm:text-base mb-4">
                        <span className='font-semibold text-gray-800'>P&L Change:</span>{' '}
                        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                          {isPositive ? '+' : ''}
                          {percentageChange.toFixed(2)}%
                        </span>
                      </p>
                    </div>
                    <button
                      className="mt-4 w-full py-2.5 px-5 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300 transform hover:-translate-y-0.5"
                      onClick={() => handleSell(investment, index)}
                    >
                      Sell
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
              <p className="text-lg text-gray-700">No investments found. Start investing today!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
