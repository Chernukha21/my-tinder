'use client';
import React, { Key, useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from '@heroui/tabs';
import { Tab } from '@heroui/react';
import { Member } from '@prisma/client';
import MemberCard from '@/app/members/MemberCard';
import { Spinner } from '@heroui/spinner';

type Props = {
  members: Member[];
  likeIds: string[];
};

type TabSize = 'sm' | 'md' | 'lg';
type TabVariant = 'solid' | 'underlined' | 'bordered' | 'light';

type TabsSettings = {
  size: TabSize;
  variant: TabVariant;
};

const ListTab = ({ members, likeIds }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  const [tabsSettings, setTabsSettings] = useState<TabsSettings>({
    size: 'md',
    variant: 'solid',
  });

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setTabsSettings({
          size: 'sm',
          variant: 'underlined',
        });
      } else if (width < 1024) {
        setTabsSettings({
          size: 'sm',
          variant: 'solid',
        });
      } else {
        setTabsSettings({
          size: 'md',
          variant: 'solid',
        });
      }
    };

    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  const tabs = [
    { id: 'source', label: 'Members I have liked' },
    { id: 'target', label: 'Members that liked me' },
    { id: 'mutual', label: 'Mutual likes' },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('type', key.toString());
      router.replace(`${pathName}?${params.toString()}`);
    });
  }

  return (
    <div className="relative flex w-full flex-col">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        size={tabsSettings.size}
        onSelectionChange={handleTabChange}
        variant={tabsSettings.variant}
        classNames={{
          tabList: 'relative px-0 gap-0.5 p-0',
          tab: 'px-4 py-2 text-[10px] min-w-0',
          tabContent: 'text-default-500 group-data-[selected=true]:text-foreground',
          cursor: 'absolute w-[100%] h-[2px] bottom-0 bg-secondary',
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {members.length > 0 && !isPending ? (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-8">
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} likeIds={likeIds} />
                ))}
              </div>
            ) : (
              <div>No members for this filter</div>
            )}
          </Tab>
        )}
      </Tabs>
      <div>
        {isPending && (
          <div className="pointer-events-none -top-1/2 bottom-0 right-4 flex items-center">
            <Spinner size="sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTab;
