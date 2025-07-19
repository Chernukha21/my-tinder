import {ZodIssue} from 'zod';

type ActionResult<T> = { status: 'success'; data: T } | { status: 'error'; error: string | ZodIssue[] };

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
    select: {
        id: true;
        text: true;
        created: true;
        dateRead: true;
        sender: {
            select: { userId; name; image };
        };
        recipient: {
            select: { userId; name; image };
        };
    };
}>;

type MessageDto = {
    id: string;
    text: string;
    created: string;
    dateRead: string | null;

    senderId: string;         // userId
    senderName: string;
    senderImage: string | null;
    senderMemberId: string;   // ✅ NEW

    recipientId: string;      // userId
    recipientName: string;
    recipientImage: string | null;
    recipientMemberId: string; // ✅ optional if needed

    otherUserId: string;
    otherUserName?: string;
    otherUserImage?: string | null;
    otherMemberId: string;
};