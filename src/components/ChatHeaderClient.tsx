'use client';
import { useShallow } from 'zustand/shallow';
import usePresenceStore from '@/store/usePresenceStore';
import { useTranslations } from 'next-intl';

type Props = {
  user: {
    userId: string;
    name: string;
  };
};

const ChatHeaderClient = ({ user }: Props) => {
  const members = usePresenceStore(useShallow((state) => state.members));
  const translation = useTranslations('Messages');
  const isOnline = members.includes(user.userId);

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex flex-col">
        <span className="font-sans text-2xl text-secondary">{`${translation('chat with')} ${user.name}`}</span>
        <span className="text-xs text-gray-500">{isOnline ? 'online' : 'offline'}</span>
      </div>
    </div>
  );
};

export default ChatHeaderClient;
