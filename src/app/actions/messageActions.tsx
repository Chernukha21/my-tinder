"use server";
import {messageSchema, MessageSchema} from "@/lib/schemas/messageSchema";
import {ActionResult} from "@/types";
import {Message} from "@prisma/client";
import {getAuthUserId} from "@/app/actions/authActions";
import {prisma} from "@/lib/prisma";
import {mapMessageToMessageDto} from "@/lib/mappings";


export async function createMessage(recipientMemberId: string, data: MessageSchema): Promise<ActionResult<Message>> {
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
        });

        return {status: "success", data: message}
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
            select: {
                id: true,
                text: true,
                created: true,
                dateRead: true,
                sender: {
                    select: {
                        id: true, // Member.id
                        userId: true,
                        name: true,
                        image: true,
                    },
                },
                recipient: {
                    select: {
                        id: true, // Member.id
                        userId: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        if (messages.length > 0) {
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
        }

        const mapped = messages.map((msg) =>
            mapMessageToMessageDto(msg, currentUserId)
        );

        return {
            status: "success",
            data: mapped,
        };
    } catch (error) {
        console.error(error);
        return {
            status: "error",
            error: "Failed to fetch message thread",
        };
    }
}


export async function getMessagesByContainer(container: string) {
    try {
        const currentUserId = await getAuthUserId();

        const conditions = {
            [container === 'outbox' ? 'senderId' : 'recipientId']: currentUserId,
            ...(container === 'outbox' ? {senderDeleted: false} : {recipientDeleted: false}),
        };

        const messages = await prisma.message.findMany({
            where: conditions,
            orderBy: {created: "desc"},
            select: {
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
            },
        });

        return messages.map((msg) =>
            mapMessageToMessageDto(msg, currentUserId)
        );
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteMessage(messageId: string, isOutBox: boolean) {
    const selector = isOutBox ? 'senderDeleted' : 'recipientDeleted';
    try {
        const userId = await getAuthUserId();
        await prisma.message.update({
            where: {id: messageId},
            data: {
                [selector]: true
            }
        })
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