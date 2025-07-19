import {formatShortDateTime} from '@/lib/util';
import {MessageDto, MessageWithSenderRecipient} from '@/types';

export function mapMessageToMessageDto(message: MessageWithSenderRecipient, currentUserId: string): MessageDto {
    const isSender = message.sender.userId === currentUserId;

    return {
        id: message.id,
        text: message.text,
        created: formatShortDateTime(message.created),
        dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,

        senderId: message.sender.userId,
        senderName: message.sender.name,
        senderImage: message.sender.image,
        senderMemberId: message.sender.id, // ✅ new field

        recipientId: message.recipient.userId,
        recipientName: message.recipient.name,
        recipientImage: message.recipient.image,
        recipientMemberId: message.recipient.id, // optional

        otherUserId: isSender ? message.recipient.userId : message.sender.userId,
        otherUserName: isSender ? message.recipient.name : message.sender.name,
        otherUserImage: isSender ? message.recipient.image : message.sender.image,
        otherMemberId: isSender ? message.recipient.id : message.sender.id,
    };
}