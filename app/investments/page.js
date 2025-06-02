'use client';
import Header from '@/app/components/header';
import { useEffect, useState } from 'react';
import Spinner from '../components/spinner/spinner';

export default function Investments() {
  const [coinData, setCoinData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const fetchInvestmentsAndCoins = async () => {
      try {
        const investmentsRaw = localStorage.getItem('Investments');
        const investments = investmentsRaw ? JSON.parse(investmentsRaw) : [];

        // Om de inte har några investeringar
        if (!investments.length) {
          setLoading(false);
          return;
        }

        // Hämta alla symboler in i en lista
        const uniqueSymbols = [...new Set(investments.map(inv => inv.coinSymbol))];

        const requests = uniqueSymbols.map(symbol =>
          fetch(`/api/coins/getOneCoinValue?&symbols=${symbol}`)
        );
        
        // Väntar in svar från flera fetch
        const responses = await Promise.all(requests);
        
        // Loopa igenom alla respones för att se om vi fått error och ge tillbaka responses i json format
        const dataResponses = await Promise.all(
          responses.map(async res => {
            if (!res.ok) throw new Error('Failed to fetch coin data');
            return res.json();
          })
        );

        const allCoinData = {};
        dataResponses.forEach(data => {
          const symbol = Object.keys(data.data)[0]; // Hämtar in symbolen
          allCoinData[symbol] = data.data[symbol][0]; // Hämta all info om den specifika coinen
        });

        setCoinData(allCoinData);

      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentsAndCoins();
  }, []);

  if (error) return <p>Error: {error}</p>;

  const investments = JSON.parse(localStorage.getItem('Investments') || '[]');

  const handleSell = (investment, index) => {
    const coinSymbol = investment.coinSymbol;
    const amountToSell = investment.coinsBought;
    const sellValue = (coinData[coinSymbol]?.quote?.USD?.price * amountToSell).toFixed(2);

    const confirmSell = window.confirm(
      `Are you sure you want to sell ${amountToSell} ${coinSymbol} for $${sellValue}?`
    );

    if (!confirmSell) return;

    let investments = JSON.parse(localStorage.getItem('Investments')) || [];
    investments.splice(index, 1);
    localStorage.setItem('Investments', JSON.stringify(investments));

    let currentBalance = parseFloat(localStorage.getItem('Amount') || 0);
    currentBalance += parseFloat(sellValue);
    localStorage.setItem('Amount', currentBalance.toFixed(2));

    setLoading(true);

    setTimeout(() => {
        location.reload();
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
              <span className='font-bold text-black'>Available Balance:</span> {localStorage.getItem('Amount') || 0}$
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
                    const totalValue = coin && investment.coinsBought
                      ? (coin.quote.USD.price * investment.coinsBought).toFixed(2)
                      : 0;

                    const percentageChange = amountInvested > 0
                      ? ((totalValue - amountInvested) / amountInvested) * 100
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