'use client'
import { useState } from 'react';
import { useEffect } from 'react';

function money() {
    const [amount, setAmount] = useState("");
    const [total, setTotal] = useState(0);

    const handleAdd = () => {
        let amountTotal = Number(total) + Number(amount)
        storeAmount(amountTotal)
        setTotal(amountTotal);
        setAmount("");
    };

    const storeAmount = (total) => {
        console.log(total);
        localStorage.setItem('Amount', total);
    }

    useEffect(() => {
        const storedAmount = localStorage.getItem('Amount');
        if (storedAmount) {
            setTotal(JSON.parse(storedAmount));
        }
    }
    , []);

    return (
        <section className="flex flex-col space-y-5 py-10 px-10 sm:flex-row align-center justify-between border-b border-gray-300">
            <h2 className="text-2xl mb-5 sm:mb-0"><span className="font-bold">USD:</span> ${total}</h2>
            <aside className="flex align-center justify-between gap-4">
                <input type="number" placeholder="amount" className="border border-gray-300 rounded-md p-2 w-full max-w-sm" onChange={(e) => setAmount(Number(e.target.value))} value={amount}/>
                <button className="py-2.5 px-5 border-1 border-black rounded-2xl shadow-ms" onClick={handleAdd}>Add</button>
            </aside>

        </section>
    )
}

export default money