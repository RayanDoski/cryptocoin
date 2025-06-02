// app/api/coins/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const url = new URL('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');

    // Endast dessa parametrar får änvändas i listings/latest
    const defaults = { start: '1', limit: '10', convert: 'USD' };

    ['start', 'limit', 'convert'].forEach((p) => {
      url.searchParams.set(p, searchParams.get(p) || defaults[p]);
    });

    const cmcRes = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
        Accept: 'application/json',
      }
    });

    const cmcJson = await cmcRes.json();

    if (!cmcRes.ok) {
      const msg = cmcJson?.status?.error_message || cmcRes.statusText;
      return NextResponse.json({ error: msg }, { status: cmcRes.status });
    }

    return NextResponse.json(cmcJson, {
      headers: { 'Cache-Control': 'public, max-age=60' }
    });

  } catch (err) {
    console.error('[coins/route] unexpected error', err);
    return NextResponse.json(
      // om err faktiskt är ett error object så visas det annars så har vi alternativet "Unknown error"
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
