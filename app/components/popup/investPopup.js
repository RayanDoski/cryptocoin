'use client'
import { useState } from 'react';

function investPopup({ coin, onClose }) {


    const [amount, setAmount] = useState("");

    const handleInvest = (e) => {
        e.preventDefault();
        // Användarens pengar från localStorage
        let storedAmount = localStorage.getItem('Amount');
        console.log(storedAmount);
        //parseInt(storedAmount, 10);

        if (Number(amount) <= 0 || Number(amount) > storedAmount) {
            alert("Please enter a valid investment amount.");
            return;
        } else {
            console.log(`Investing $${amount} in ${coin.name}`);
            const updatedAmount = storedAmount - amount;
            localStorage.setItem('Amount', updatedAmount);
            let investment = {
                coinId: coin.id,
                coinName: coin.name,
                coinCurrentPrice: coin.quote?.USD?.price?.toFixed(2),
                coin}
            localStorage.setItem('Investments', );
            location.reload();

            // Hur många coins de köpt
            // Amount of money put in
            
        }
        setAmount("");
        onClose();
    }

    return (
        <>
            <section className="fixed z-10 w-full h-full top-0 left-0 bg-gray-800/75 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <aside className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Invest in {coin.name}</h2>
                        <h2 onClick={onClose} className=" cursor-pointer font-bold text-2xl p-2.5">X</h2>
                    </aside>

                    {/* for the specifik coin */}
                    <div key={coin.id} className="coin-card p-4 bg-white rounded-lg border-1 border-gray-300 my-7.5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{coin.name} <span className="text-gray-500">({coin.symbol})</span></h3>
                        <p className="text-sm text-gray-600 mb-1">Rank: <span className="font-medium">#{coin.cmc_rank}</span></p>
                        <p className="text-sm text-gray-600 mb-1">Price: <span className="font-medium">${coin.quote?.USD?.price?.toFixed(2) || 'N/A'}</span></p>
                        <p className={`text-sm mb-1 ${coin.quote?.USD?.percent_change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            24h Change: <span className="font-medium">{coin.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%</span>
                        </p>
                        <p className="text-sm text-gray-600">Market Cap: <span className="font-medium">${(coin.quote?.USD?.market_cap / 1000000000)?.toFixed(2) || 'N/A'}B</span></p>
                    </div>

                    <form className="space-y-4" onSubmit={handleInvest}>
                        <input
                            type="number"
                            placeholder="Investment Amount (USD)"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setAmount(Number(e.target.value))}
                            value={amount}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Invest Now
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default investPopup