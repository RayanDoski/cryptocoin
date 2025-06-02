import { NextResponse } from 'next/server';

// GET function eftersom vi hämtar något med en request vilket är Länken med parametrar
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols');

    if (!symbols) {
      return NextResponse.json(
        { error: "You Must Have The 'symbols' parameter!" },
        { status: 400 }
      );
    }

    const url = new URL('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'); 
    url.searchParams.set('symbol', symbols);
    url.searchParams.set('convert', 'USD');

    const cmcRes = await fetch(url.toString(), {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
        'Accept': 'application/json',
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
    console.error('[getOneCoinValue] unexpected error', err);
    return NextResponse.json(
      // om err faktiskt är ett error object så visas det annars så har vi alternativet "Unknown error"
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}