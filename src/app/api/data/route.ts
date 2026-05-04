import { NextResponse } from 'next/server';

function getRestConfig() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return { url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN };
  }
  
  if (process.env.REDIS_URL) {
    try {
      const parsed = new URL(process.env.REDIS_URL);
      const token = parsed.password;
      const host = parsed.hostname;
      return { url: `https://${host}`, token };
    } catch (e) {
      console.error("Failed to parse REDIS_URL", e);
    }
  }
  return null;
}

export async function GET() {
  try {
    const config = getRestConfig();
    if (!config) return NextResponse.json({});

    const url = `${config.url}/get/portfolio_data`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({});
    }

    const data = await response.json();
    if (data.result) {
      return NextResponse.json(JSON.parse(data.result));
    }
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  try {
    const config = getRestConfig();
    if (!config) throw new Error('No Redis connection string found in environment.');

    const body = await request.json();
    const url = `${config.url}/set/portfolio_data`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.stringify(body)),
    });

    if (!response.ok) {
      throw new Error('Failed to save to Redis');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
