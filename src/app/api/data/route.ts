import { NextResponse } from 'next/server';
import { put, head, list } from '@vercel/blob';

const BLOB_KEY = 'portfolio-data.json';

export async function GET() {
  try {
    // Check if blob exists
    const { blobs } = await list({ prefix: BLOB_KEY });
    
    if (blobs.length === 0) {
      return NextResponse.json({});
    }

    // Fetch the blob data
    const response = await fetch(blobs[0].url);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Store data in Vercel Blob
    const blob = await put(BLOB_KEY, JSON.stringify(body), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to save data' 
    }, { status: 500 });
  }
}
