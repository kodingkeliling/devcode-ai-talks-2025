import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(memories);
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userName, imageUrl, caption } = body;

        if (!userName || !imageUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const memory = await prisma.memory.create({
            data: {
                userName,
                imageUrl,
                caption,
            },
        });

        return NextResponse.json(memory);
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
