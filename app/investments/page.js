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
      <section>
        <ul className='px-2.5 py-5 sm:pt-15 space-y-10 max-w-6xl mx-auto'>
          <aside>
            <h1 className='text-2xl ms:text-3xl md:text-4xl lg:text-5xl font-bold'>Your Investments</h1>
            <h2 className='text-[14px] sm:text-[16px] lg:text-[18px] ml-2'>
              {/* Use state for available balance */}
              <span className='font-bold text-black'>Available Balance:</span> {availableBalance}$
            </h2>
          </aside>

          {investments.length > 0 ? (
            investments.map((investment, index) => {
              const coin = coinData[investment.coinSymbol];
              const price = coin?.quote?.USD?.price?.toFixed(2) || 'N/A';
              const totalValue = coin && investment.coinsBought
                ? (coin.quote.USD.price * investment.coinsBought).toFixed(2)
                : 'N/A';

              return (
                <li key={index} className="w-full py-5 px-10 border border-gray-300 rounded-md shadow-xl text-gray-600 space-y-1 text-sm sm:text-base md:text-lg lg:text-xl">
                  <h2 className='text-lg sm:text-2xl md:text-3xl font-bold mb-2'>{investment.coinName}</h2>
                  <p><span className='font-bold text-black'>Current Value:</span> ${price}</p>
                  <p><span className='font-bold text-black'>Amount Of Coins:</span> {investment.coinsBought}</p>
                  <p><span className='font-bold text-black'>Total Value:</span> ${totalValue}</p>
                  {(() => {
                    const amountInvested = investment.amountInvested || 0;
                    const totalValueNum = coin && investment.coinsBought
                      ? (coin.quote.USD.price * investment.coinsBought)
                      : 0;

                    const percentageChange = amountInvested > 0
                      ? ((totalValueNum - amountInvested) / amountInvested) * 100
                      : 0;

                    const isPositive = percentageChange >= 0;

                    return (
                      <p>
                        <span className='font-bold text-black'>Percentage Change:</span>{' '}
                        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                          {isPositive ? '+' : ''}
                          {percentageChange.toFixed(2)}%
                        </span>
                      </p>
                    );
                  })()}
                  <button className='px-5 py-1 bg-red-600 rounded-md shadow-md text-white mt-2.5' onClick={() => handleSell(investment, index)}>Sell</button>
                </li>
              );
            })
          ) : (
            <li>No investments found.</li>
          )}
        </ul>
      </section>
    </>
  );
}
