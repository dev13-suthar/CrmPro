import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust size if needed
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uniqueName = `${Date.now()}-${file.name}`;

    // Upload file to BunnyCDN
    const response = await axios.put(
      `https://storage.bunnycdn.com/docscrmapp/${uniqueName}`,
      buffer,
      {
        headers: {
          AccessKey: '8d8445be-ea83-4855-bb895741bbb1-0dc0-4541',
          'Content-Type': file.type || 'application/octet-stream',
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      return NextResponse.json({
        url: `https://crmapp.b-cdn.net/${uniqueName}`,
      });
    } else {
      return NextResponse.json({ error: 'Failed to upload file to BunnyCDN' }, { status: 500 });
    }
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'An error occurred during file upload' }, { status: 500 });
  }
}
