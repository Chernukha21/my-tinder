'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Filters from '@/components/navbar/Filters';

export default function FiltersWrapper() {
  const pathname = usePathname();
  const locale = useLocale();

  return pathname === `/${locale}/members` ? <Filters /> : null;
}
