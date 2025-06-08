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
        <section className="flex flex-col space-y-5 py-10 px-10 sm:flex-row align-center justify-between border-b border-gray-300">
            <h2 className="text-2xl mb-5 sm:mb-0"><span className="font-bold">USD:</span> ${total}</h2>
            <aside className="flex align-center justify-between gap-4">
                <input
                    type="number"
                    placeholder="amount"
                    className="border border-gray-300 rounded-md p-2 w-full max-w-sm"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    value={amount}
                />
                <button
                    className="py-2.5 px-5 border-1 border-black rounded-2xl shadow-ms"
                    onClick={handleAdd}
                >
                    Add
                </button>
            </aside>
        </section>
    );
}

export default Money;