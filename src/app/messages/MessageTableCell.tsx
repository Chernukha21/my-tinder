import React from 'react';
import PresenceAvatar from "@/components/PresenceAvatar";
import {truncateString} from "@/lib/util";
import {Button} from "@heroui/button";
import {AiFillDelete} from "react-icons/ai";
import {MessageDto} from "@/types";

type Props = {
    item: MessageDto,
    columnKey: string;
    isOutBox: boolean;
    deleteMessage: (message: MessageDto) => void;
    isDeleting: boolean
}

const MessageTableCell = ({item, columnKey, isOutBox, deleteMessage, isDeleting}: Props) => {
    const cellValue = item[columnKey as keyof MessageDto];
    switch (columnKey) {
        case 'recipientName':
        case 'senderName':
            return (
                <div
                    className='flex items-center gap-2 cursor-pointer'>
                    <PresenceAvatar
                        userId={isOutBox ? item.recipientId : item.senderId}
                        src={isOutBox ? item.recipientImage : item.senderImage}
                    />
                    <span>{cellValue}</span>
                </div>
            )
        case 'text':
            return (
                <div>
                    {truncateString(cellValue, 80)}
                </div>
            )
        case 'created':
            return cellValue;
        default:
            return (
                <Button isIconOnly variant="light" onPress={() => deleteMessage(item)}
                        isLoading={isDeleting}>
                    <AiFillDelete size={24} className="text-danger"/>
                </Button>
            )
    }
};

export default MessageTableCell;