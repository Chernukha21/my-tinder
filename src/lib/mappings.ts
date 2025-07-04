import {formatShortDateTime} from '@/lib/util';
import {MessageDto, MessageWithSenderRecipient} from '@/types';

export function mapMessageToMessageDto(message: MessageWithSenderRecipient, currentUserId: string): MessageDto {
    const isSender = message.sender.userId === currentUserId;
    const other = isSender ? message.recipient : message.sender;

    return {
        id: message.id,
        text: message.text,
        created: formatShortDateTime(message.created),
        dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,

        senderId: message.sender.userId,
        senderName: message.sender.name,
        senderImage: message.sender.image,

        recipientId: message.recipient.userId,
        recipientName: message.recipient.name,
        recipientImage: message.recipient.image,

        otherUserId: other.userId,
        otherUserName: other.name,
        otherUserImage: other.image,
        otherMemberId: other.id,
    };
}