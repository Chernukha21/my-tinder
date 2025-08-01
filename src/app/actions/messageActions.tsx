"use server";
import {messageSchema, MessageSchema} from "@/lib/schemas/messageSchema";
import {ActionResult, MessageDto} from "@/types";
import {getAuthUserId} from "@/app/actions/authActions";
import {prisma} from "@/lib/prisma";
import {mapMessageToMessageDto} from "@/lib/mappings";
import {pusherServer} from "@/lib/pusher";
import {createChatId} from "@/lib/util";


export async function createMessage(recipientMemberId: string, data: MessageSchema): Promise<ActionResult<MessageDto>> {
    try {
        const userId = await getAuthUserId();

        const validated = messageSchema.safeParse(data);
        if (!validated.success) {
            return {status: "error", error: validated.error.errors};
        }

        const {text} = validated.data;

        const recipientMember = await prisma.member.findUnique({
            where: {id: recipientMemberId},
            select: {userId: true},
        });

        if (!recipientMember) {
            return {status: "error", error: "Recipient member not found"};
        }

        const message = await prisma.message.create({
            data: {
                text,
                senderId: userId,
                recipientId: recipientMember.userId,
            },
            select: messageSelect,
        });

        const messageDto = mapMessageToMessageDto(message, userId);

        await pusherServer.trigger(createChatId(userId, recipientMemberId), 'message:new', messageDto);
        await pusherServer.trigger(`private-${recipientMember.userId}`, 'message:new', messageDto);

        return {status: "success", data: messageDto}
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Message has not been sent.'};
    }
}

export async function getMessageThread(otherUserId: string) {
    try {
        const currentUserId = await getAuthUserId();

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        sender: {userId: currentUserId},
                        recipient: {userId: otherUserId},
                        senderDeleted: false,
                    },
                    {
                        sender: {userId: otherUserId},
                        recipient: {userId: currentUserId},
                        recipientDeleted: false,
                    },
                ],
            },
            orderBy: {created: "asc"},
            select: messageSelect,
        });

        let readCount = 0;

        if (messages.length > 0) {
            const readMessageIds = messages
                .filter(m => m.dateRead === null
                    && m.recipient?.userId === currentUserId
                    && m.sender?.userId === otherUserId)
                .map(m => m.id);

            await prisma.message.updateMany({
                where: {
                    id: {in: readMessageIds},
                },
                data: {
                    dateRead: new Date(),
                },
            });

            await prisma.message.updateMany({
                where: {
                    sender: {userId: otherUserId},
                    recipient: {userId: currentUserId},
                    dateRead: null,
                },
                data: {
                    dateRead: new Date(),
                },
            });
            readCount = readMessageIds.length;
            await pusherServer.trigger(createChatId(currentUserId, otherUserId), 'messages:read', readMessageIds);
        }


        const mapped = messages.map((msg) =>
            mapMessageToMessageDto(msg, currentUserId)
        );

        return {
            status: "success",
            messages: mapped,
            readCount,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getMessagesByContainer(container?: string | null, cursor?: string, limit = 10): Promise<{
    messages: MessageDto[];
    nextCursor?: string
}> {
    try {
        const currentUserId = await getAuthUserId();

        const conditions = {
            [container === 'outbox' ? 'senderId' : 'recipientId']: currentUserId,
            ...(container === 'outbox' ? {senderDeleted: false} : {recipientDeleted: false}),
        };

        const messages = await prisma.message.findMany({
            where: {
                ...conditions,
                ...(cursor ? {created: {lte: new Date(cursor)}} : {}),

            },
            orderBy: {created: "desc"},
            select: messageSelect,
            take: limit + 1,
        });
        let nextCursor: string | undefined;
        if (messages.length > limit) {
            const nextItem = messages.pop();
            nextCursor = nextItem?.created.toISOString();
        } else {
            nextCursor = undefined;
        }
        const messagesToReturn = messages.map((msg) =>
            mapMessageToMessageDto(msg, currentUserId)
        );
        return {
            messages: messagesToReturn,
            nextCursor,
        };
    } catch (error) {
        console.error(error);
        return {
            messages: [],
            nextCursor: undefined,
        };
    }
}

export async function deleteMessage(messageId: string, isOutBox: boolean) {
    const selector = isOutBox ? 'senderDeleted' : 'recipientDeleted';
    try {
        const userId = await getAuthUserId();
        const result = await prisma.message.updateMany({
            where: {id: messageId},
            data: {[selector]: true},
        });

        if (result.count === 0) {
            console.warn("⚠️ No message found with ID:", messageId);
        }
        const messagesToDelete = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        senderDeleted: true,
                        recipientDeleted: true,
                    },
                    {
                        recipientId: userId,
                        recipientDeleted: true,
                        senderDeleted: true,
                    },
                ],
            },
        });

        if (messagesToDelete.length > 0) {
            await prisma.message.deleteMany({
                where: {
                    OR: messagesToDelete.map(m => ({id: m.id}))
                }
            })
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUnreadMessagesCount() {
    try {
        const userId = await getAuthUserId();
        return prisma.message.count({
            where: {
                recipientId: userId,
                dateRead: null,
                recipientDeleted: false,
            },
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const messageSelect = {
    id: true,
    text: true,
    created: true,
    dateRead: true,
    sender: {
        select: {
            id: true,
            userId: true,
            name: true,
            image: true,
        },
    },
    recipient: {
        select: {
            id: true,
            userId: true,
            name: true,
            image: true,
        },
    },
};