'use client';
import { useShallow } from 'zustand/shallow';
import usePresenceStore from '@/store/usePresenceStore';

type Props = {
  user: {
    userId: string;
    name: string;
  };
};

const ChatHeaderClient = ({ user }: Props) => {
  const members = usePresenceStore(useShallow((state) => state.members));

  const isOnline = members.includes(user.userId);

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex flex-col">
        <span className="font-sans text-2xl text-secondary">{`Chat with ${user.name}`}</span>
        <span className="text-xs text-gray-500">{isOnline ? 'online' : 'offline'}</span>
      </div>
    </div>
  );
};

export default ChatHeaderClient;
