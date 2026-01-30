'use client';
import clsx from 'clsx';
import {transformImageUrl} from '@/lib/util';
import {MessageDto} from '@/types';
import {useEffect, useRef} from 'react';
import PresenceAvatar from '@/components/PresenceAvatar';

type Props = {
  message: MessageDto;
  currentUserId: string;
};

export default function MessageBox({ message, currentUserId }: Props) {
  const isCurrentUserSender = message.senderId === currentUserId;
  const isRead = isCurrentUserSender && !!message.dateRead;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageEndRef]);

  const renderAvatar = () => (
    <div className="self-end">
      <PresenceAvatar
        src={transformImageUrl(message.senderImage) || '/images/user.png'}
        userId={message.senderId}
      />
    </div>
  );

  const messageContentClasses = clsx(
    "flex flex-col w-fit px-3 py-2",
    "min-w-[12rem] max-w-[75%] sm:max-w-[60%]",
    {
      "bg-blue-100 text-gray-900 rounded-2xl rounded-br-md ml-auto": isCurrentUserSender,
      "bg-green-100 text-gray-900 rounded-2xl rounded-bl-md mr-auto": !isCurrentUserSender,
    }
  );

  const renderMessageHeader = () => (
    <div className={clsx("flex", isCurrentUserSender ? "justify-end" : "justify-start")}>
      <span className="text-sm font-semibold">{message.senderName}</span>
    </div>
  );

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        {renderMessageHeader()}
        <p className="text-sm text-gray-900 break-words p-2 rounded-2xl ">{message.text}</p>
          {isCurrentUserSender && (
              <div className="flex items-center justify-end gap-1 text-[10px] text-gray-500">
                  <span>{message.created}</span>
                  <span>{isRead ? '✓✓' : '✓'}</span>
              </div>
          )}
      </div>
    );
  };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx('flex gap-2 mb-3', {
          'justify-end text-right': isCurrentUserSender,
          'justify-start': !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
}
