import { NextRequest, NextResponse } from 'next/server';
import { getTokens, getUserInfo } from '@/lib/google-drive';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        const tokens = await getTokens(code);
        const userInfo = await getUserInfo(tokens.access_token!);

        return NextResponse.json({
            accessToken: tokens.access_token,
            userName: userInfo.name,
        });
    } catch (error: unknown) {
        console.error('OAuth Error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
