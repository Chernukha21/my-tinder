'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import MessageBox from '@/app/members/[userId]/chat/MessageBox';
import { MessageDto } from '@/types';
import { pusherClient } from '@/lib/pusher';
import { formatShortDateTime } from '@/lib/util';
import { Channel } from 'pusher-js';
import useMessageStore from '@/store/useMessageStore';

type Props = {
  initialMessages: { messages: MessageDto[]; readCount: number };
  currentUserId: string;
  chatId: string;
};

const MessageList = ({ initialMessages, currentUserId, chatId }: Props) => {
  const [messages, setMessages] = useState(initialMessages.messages);
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);
  const channelRef = useRef<Channel | null>(null);
  const setReadCount = useRef(false);
  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    if (!setReadCount.current) {
      updateUnreadCount(-initialMessages.readCount);
      setReadCount.current = true;
    }
  }, [initialMessages.readCount, updateUnreadCount]);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message,
      ),
    );
  }, []);

  useEffect(() => {
    if (!!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);
      channelRef.current.bind('message:new', handleNewMessage);
      channelRef.current.bind('messages:read', handleReadMessages);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind('message:new');
        channelRef.current.unbind('message:read');
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div>
      {messages && messages.length === 0 ? (
        'No messages to display'
      ) : (
        <div className="pb-24">
          {messages &&
            messages.map((message) => (
              <MessageBox key={message.id} message={message} currentUserId={currentUserId} />
            ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
