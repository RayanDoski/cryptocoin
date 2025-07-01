'use client'
import { useState, useEffect } from 'react'; // Import useEffect
import MessagePopup from './messagePopup';
import Spinner from '../spinner/spinner';

function InvestPopup({ coin, onClose }) { // Renamed to PascalCase for convention

    const [amount, setAmount] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showProcessingSpinner, setShowProcessingSpinner] = useState(false);
    // State to store the user's current balance from localStorage
    const [userBalance, setUserBalance] = useState(0);
    // State to store existing investments from localStorage
    const [existingInvestments, setExistingInvestments] = useState([]);

    // Load initial data from localStorage when the component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure code runs only in the browser
            const storedAmount = localStorage.getItem('Amount');
            if (storedAmount) {
                setUserBalance(Number(storedAmount));
            }

            const storedInvestments = localStorage.getItem('Investments');
            if (storedInvestments) {
                try {
                    setExistingInvestments(JSON.parse(storedInvestments));
                } catch (e) {
                    console.error("Error parsing investments from localStorage:", e);
                    setExistingInvestments([]); // Reset if parsing fails
                }
            }
        }
    }, []); // Empty dependency array ensures this runs once after initial render

    const handleInvest = (e) => {
        e.preventDefault();

        setShowProcessingSpinner(true);

        // Use the userBalance state, which is populated from localStorage on mount
        if (Number(amount) <= 0 || Number(amount) > userBalance) {
            setShowErrorPopup(true); // Set to true to show the error popup
            setShowProcessingSpinner(false);
            return;
        } else {
            console.log(`Investing $${amount} in ${coin.name}`);
            const updatedAmount = userBalance - Number(amount); // Use userBalance state
            if (typeof window !== 'undefined') { // Ensure localStorage write is client-side
                localStorage.setItem('Amount', updatedAmount.toString()); // localStorage stores strings
            }
            setUserBalance(updatedAmount); // Update state immediately

            const coinsBought = Number(amount) / coin.quote?.USD?.price;

            let newInvestment = {
                coinId: coin.id,
                coinName: coin.name,
                coinCurrentPrice: coin.quote?.USD?.price?.toFixed(2) || ":)",
                amountInvested: Number(amount),
                coinsBought: coinsBought.toFixed(6),
                coinSymbol: coin.symbol,
                dateInvested: new Date().toISOString()
            };

            // Update existing investments state and localStorage
            const updatedInvestments = [...existingInvestments, newInvestment];
            if (typeof window !== 'undefined') { // Ensure localStorage write is client-side
                localStorage.setItem('Investments', JSON.stringify(updatedInvestments));
            }
            setExistingInvestments(updatedInvestments); // Update state immediately

            // Reload after 3 seconds, ensuring window.location is accessed client-side
            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }
        setAmount("");
    }

    return (
        <>
            {showErrorPopup && <MessagePopup message={"Du Har Inte TILLRÄKLIGT MED PENGAR!!!"} onClose={() => setShowErrorPopup(false)} />}
            {showProcessingSpinner && <Spinner />}
            <section className="fixed z-5 inset-0 bg-black/75 flex items-center justify-center backdrop-blur-sm animate-fade-in">
                <div className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full border border-gray-700 animate-scale-up-smooth">
                    <aside className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-white">Invest in {coin.name}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none p-2 rounded-full hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </aside>

                    {/* for the specifik coin */}
                    <div key={coin.id} className="p-5 bg-gray-800 rounded-lg border border-gray-700 mb-6 transition-transform duration-200 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                            {coin.name} <span className="text-gray-400 ml-2">({coin.symbol})</span>
                        </h3>
                        <p className="text-sm text-gray-400 mb-1">Rank: <span className="font-medium text-gray-300">#{coin.cmc_rank}</span></p>
                        <p className="text-sm text-gray-400 mb-1">Price: <span className="font-medium text-white">${coin.quote?.USD?.price?.toFixed(2) || 'N/A'}</span></p>
                        <p className={`text-sm mb-1 ${coin.quote?.USD?.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            24h Change: <span className="font-medium">{coin.quote?.USD?.percent_change_24h?.toFixed(2) || 'N/A'}%</span>
                        </p>
                        <p className="text-sm text-gray-400">Market Cap: <span className="font-medium text-gray-300">${(coin.quote?.USD?.market_cap / 1000000000)?.toFixed(2) || 'N/A'}B</span></p>
                    </div>

                    <form className="space-y-5" onSubmit={handleInvest}>
                        <input
                            type="number"
                            placeholder="Investment Amount (USD)"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                            onChange={(e) => setAmount(Number(e.target.value))}
                            value={amount}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Invest Now
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default InvestPopup
