// app/api/coins/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Use the Free‐tier “listings latest” endpoint
    const url = new URL(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    );

    // Only these params are supported on listings/latest
    const defaults = { start: '1', limit: '10', convert: 'USD' };
    ['start', 'limit', 'convert'].forEach((p) => {
      url.searchParams.set(p, searchParams.get(p) || defaults[p]);
    });

    const cmcRes = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': "b522693a-f6fa-4fb1-a297-7870c03de7b5",
        Accept: 'application/json',
      }
    });

    const cmcJson = await cmcRes.json();
    if (!cmcRes.ok) {
      const msg = cmcJson?.status?.error_message || cmcRes.statusText;
      return NextResponse.json({ error: msg }, { status: cmcRes.status });
    }

    return NextResponse.json(cmcJson, {
      // you can cache for, say, 60s, to avoid hammering the free rate limit
      headers: { 'Cache-Control': 'public, max-age=60' }
    });
  } catch (err) {
    console.error('🛑 [coins/route] unexpected error', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
