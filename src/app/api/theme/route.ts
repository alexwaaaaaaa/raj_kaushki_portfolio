import { NextResponse } from 'next/server';

function getRestConfig() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return { url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN };
  }
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
    if (!config) {
      console.log('No Redis config found, returning empty data');
      return NextResponse.json({});
    }

    const url = `${config.url}/get/theme_data`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.log('Redis GET failed:', response.status);
      return NextResponse.json({});
    }

    const data = await response.json();
    if (data.result) {
      let parsed = JSON.parse(data.result);
      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed);
        } catch (e) {
          // keep as string
        }
      }
      console.log('Theme data fetched from Redis successfully');
      return NextResponse.json(parsed);
    }
    console.log('No theme data found in Redis');
    return NextResponse.json({});
  } catch (error) {
    console.error('Error in GET /api/theme:', error);
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  try {
    const config = getRestConfig();
    if (!config) {
      throw new Error('No Redis connection string found in environment.');
    }

    const body = await request.json();
    const url = `${config.url}/set/theme_data`;
    
    console.log('Saving theme data to Redis...');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.stringify(body)),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Redis SET failed:', response.status, errorText);
      throw new Error('Failed to save to Redis');
    }

    console.log('Theme data saved to Redis successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving theme data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
