'use client';

import { useEffect, useState } from 'react';

export default function CryptoList() {
const [coins, setCoins] = useState([]);

useEffect(() => {
    fetch('/api/cryptos')
    .then(res => res.json())
    .then(json => setCoins(json.data))
    .catch(console.error);
}, []);

return (
    <ul>
    {coins.map(c => (
        <li key={c.id}>
        {c.name} ({c.symbol}): ${c.quote.USD.price.toFixed(2)}
        </li>
    ))}
    </ul>
);
}
