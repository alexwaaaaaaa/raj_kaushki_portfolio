import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Check if Cloudinary is configured
    const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

    if (isCloudinaryConfigured) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Upload directly to Cloudinary using a stream
      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio_uploads' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        
        // End stream with buffer data
        uploadStream.end(buffer);
      });

      return NextResponse.json({ 
        success: true, 
        url: uploadResult.secure_url,
        message: 'File uploaded successfully to Cloudinary'
      });
    } else {
      // Fallback: Local Upload
      console.log('Cloudinary not configured. Uploading locally...');
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      // Ensure directory exists
      await fs.mkdir(uploadDir, { recursive: true });
      
      // Create a unique file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.name) || '.png';
      const fileName = `${file.name.replace(ext, '')}-${uniqueSuffix}${ext}`;
      
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      
      return NextResponse.json({ 
        success: true, 
        url: `/uploads/${fileName}`,
        message: 'File uploaded locally successfully'
      });
    }

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
