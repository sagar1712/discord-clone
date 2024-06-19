import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { DirectMessages } from '@prisma/client';
import { NextResponse } from 'next/server';

const MESSAGES_BATCH = 10;
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = Number(searchParams.get('cursor'));
    const conversationId = searchParams.get('conversationId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse('Conversation ID missing', { status: 401 });
    }

    let messages: DirectMessages[] = [];

    if (cursor) {
      messages = await db.directMessages.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: { id: cursor.toString() },
        where: {
          conversationId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      messages = await db.directMessages.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log('[DIRECT_MESSAGES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
