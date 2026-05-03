import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop();
    const filename = `${crypto.randomUUID()}.${ext}`;
    
    // Proper path to public/uploads
    const uploadDir = join(process.cwd(), 'public/uploads');
    const filePath = join(uploadDir, filename);

    // Write file to public/uploads
    // NOTE: This works locally or on a standard Node.js server (VPS/EC2).
    // If deploying to Vercel, this directory is READ-ONLY in production.
    // In that case, you should integrate Vercel Blob or Cloudinary here.
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
