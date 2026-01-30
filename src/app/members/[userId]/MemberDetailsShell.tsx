"use client";

import { ReactNode, useRef } from 'react';
import SidebarTopButton from '@/components/SidebarTopButton';

type Props = {
  sidebar: ReactNode;
  children: ReactNode;
};

export default function MemberDetailsShell({ sidebar, children }: Props) {
  const leftColRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="
        grid
        narrow-mobile-range:grid-cols-1
        sm:grid-cols-[30%_70%]
        xl:grid-cols-[20%_80%]
        gap-2.5 sm:gap-4 lg:gap-5
        items-stretch
      "
    >
      <div ref={leftColRef} className="w-full narrow-mobile-range:col-span-full">
        {sidebar}
      </div>

      <div className="w-full">{children}</div>
      <SidebarTopButton anchorRef={leftColRef} />
    </div>
  );
}
