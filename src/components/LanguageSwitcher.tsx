'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Button } from '@heroui/react';
import { useMemo } from 'react';

const LOCALES = ['en', 'uk'] as const;
type Locale = (typeof LOCALES)[number];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;

  const selectedKeys = useMemo(() => new Set([locale]), [locale]);
  const selectedValue = useMemo(() => locale.toUpperCase(), [locale]);

  function switchTo(nextLocale: Locale) {
    if (!pathname) return;

    const segments = pathname.split('/');

    if (LOCALES.includes(segments[1] as Locale)) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    const nextPath = segments.join('/') || `/${nextLocale}`;
    router.push(nextPath);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedValue}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disallowEmptySelection
        aria-label="Select language"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const next = Array.from(keys)[0] as Locale | undefined;
          if (!next || next === locale) return;
          switchTo(next);
        }}
      >
        {LOCALES.map((locale) => (
          <DropdownItem key={locale} className="capitalize">
            {locale.toUpperCase()}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
