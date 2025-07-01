'use client'
import { useState, useEffect } from 'react';

function Money() {
    const [amount, setAmount] = useState("");
    const [total, setTotal] = useState(0);

    // Function to save to local storage, guarded by window check
    const storeAmount = (newTotal) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('Amount', newTotal.toString());
        }
    }

    // Add money function
    const handleAdd = () => {
        const amountToAdd = Number(amount);
        const newTotal = Number(total) + amountToAdd;
        storeAmount(newTotal);
        setTotal(newTotal);
        setAmount("");
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAmount = localStorage.getItem('Amount');
            if (storedAmount) {
                try {
                    setTotal(Number(storedAmount));
                } catch (e) {
                    console.error("Failed to parse stored amount from localStorage:", e);
                    setTotal(0);
                }
            }
        }
    }, []);

    return (
        <section className="flex flex-col md:flex-row items-center justify-between py-8 px-6 bg-white border-b border-gray-200 shadow-sm border-t-1 border-t-black">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 md:mb-0">
                <span className="text-gray-600">USD:</span> <span className="text-gray-900">${total}</span>
            </h2>
            <aside className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full sm:w-48 p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 shadow-inner"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    value={amount}
                />
                <button
                    className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                    onClick={handleAdd}
                >
                    Add Funds
                </button>
            </aside>
        </section>
    );
}

export default Money;