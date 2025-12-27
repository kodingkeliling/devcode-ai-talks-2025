import { NextRequest, NextResponse } from 'next/server';
import { getDriveClient } from '@/lib/google-drive';
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1];
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    try {
        const drive = getDriveClient(accessToken);

        // Convert File to Buffer then to Stream for Drive API
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        const driveResponse = await drive.files.create({
            requestBody: {
                name: `${Date.now()}-${file.name}`,
                mimeType: file.type,
            },
            media: {
                mimeType: file.type,
                body: stream,
            },
        });

        const fileId = driveResponse.data.id;

        // Set permission to public view
        await drive.permissions.create({
            fileId: fileId!,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

        return NextResponse.json({ imageUrl, fileId });
    } catch (error: unknown) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
