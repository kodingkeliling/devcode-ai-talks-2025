import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/google-drive';

export async function GET() {
    try {
        const url = getAuthUrl();
        return NextResponse.json({ url });
    } catch (error: unknown) {
        console.error('Failed to generate Auth URL:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
