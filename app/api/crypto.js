export default async function handler (req, res) {
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    const params = new URLSearchParams({
    start: '1',
    limit: '10',
    convert: 'USD'
});
try {
    const response = await fetch(`${url}?${params}`, {
    headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
    }
    });
    if (!response.ok) {
    return res.status(response.status).json({ error: 'Fel vid hämtning från CMC' });
    }
    const data = await response.json();
    res.status(200).json(data);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Serverfel' });
}
}
