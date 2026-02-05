import React from 'react';
import PresenceAvatar from '@/components/PresenceAvatar';
import { truncateString } from '@/lib/util';
import { Button } from '@heroui/button';
import { AiFillDelete } from 'react-icons/ai';
import { MessageDto } from '@/types';
import { ButtonProps, useDisclosure } from '@heroui/react';
import AppModal from '@/components/AppModal';

type Props = {
  item: MessageDto;
  columnKey: string;
  isOutBox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
};

const MessageTableCell = ({ item, columnKey, isOutBox, deleteMessage, isDeleting }: Props) => {
  const cellValue = item[columnKey as keyof MessageDto];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConfirmDeleteMessage = () => {
    deleteMessage(item);
  };

  const footerButtons: ButtonProps[] = [
    { color: 'default', onPress: onClose, children: 'Cancel' },
    { color: 'secondary', onPress: onConfirmDeleteMessage, children: 'Confirm' },
  ];

  switch (columnKey) {
    case 'recipientName':
    case 'senderName':
      return (
        <div className="flex cursor-pointer items-center gap-2">
          <PresenceAvatar
            userId={isOutBox ? item.recipientId : item.senderId}
            src={isOutBox ? item.recipientImage : item.senderImage}
          />
          <span>{cellValue}</span>
        </div>
      );
    case 'text':
      return <div>{truncateString(cellValue, 80)}</div>;
    case 'created':
      return <div>{cellValue}</div>;
    default:
      return (
        <>
          <Button isIconOnly variant="light" onPress={() => onOpen()} isLoading={isDeleting}>
            <AiFillDelete size={24} className="text-danger" />
          </Button>
          <AppModal
            isModalOpen={isOpen}
            onClose={onClose}
            body={<div>Are you sure to delete?</div>}
            header="Please confirm"
            footerButtons={footerButtons}
          />
        </>
      );
  }
};

export default MessageTableCell;
