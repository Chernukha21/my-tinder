'use client';

import { GoDot, GoDotFill } from 'react-icons/go';
import { Member } from '@prisma/client';
import usePresenceStore from '@/store/usePresenceStore';
import { useShallow } from 'zustand/shallow';

type Props = {
  member: Member;
};

export default function PresenceDot({ member }: Props) {
  const members = usePresenceStore(useShallow((state) => state.members));

  const isOnline = members.indexOf(member.userId) !== -1;

  if (!isOnline) return null;

  return (
    <>
      <GoDot size={36} className="absolute -right-[2px] -top-[2px] fill-white" />
      <GoDotFill size={32} className="animate-pulse fill-green-500" />
    </>
  );
}
