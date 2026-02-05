'use client';
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GoInbox } from 'react-icons/go';
import { MdOutlineOutbox } from 'react-icons/md';
import clsx from 'clsx';
import { Chip } from '@heroui/chip';
import useMessageStore from '@/store/useMessageStore';

const MessageSideBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState<string>(searchParams.get('container') || 'inbox');
  const unreadCount = useMessageStore((state) => state.unreadCount);

  const items = [
    { key: 'inbox', label: 'Inbox', icon: GoInbox, chip: true },
    { key: 'outbox', label: 'Outbox', icon: MdOutlineOutbox, chip: true },
  ];

  function handleSelectItem(key: string) {
    setSelected(key);
    const params = new URLSearchParams();
    params.set('container', key);
    router.replace(`${pathname}?${params}`);
  }

  return (
    <div className="flex cursor-pointer flex-col rounded-lg shadow-md">
      {items.map(({ key, icon: Icon, label, chip }) => (
        <div
          key={key}
          className={clsx('flex items-center gap-2 rounded-t-lg p-3', {
            'font-semibold text-secondary': selected === key,
            'text-black hover:text-secondary/70': selected !== key,
          })}
          onClick={() => handleSelectItem(key)}
        >
          <Icon size={24} />
          <div className="flex flex-grow justify-between">
            <span>{label}</span>
            {key === 'inbox' && chip && unreadCount > 0 && (
              <Chip color="primary">{unreadCount}</Chip>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSideBar;
