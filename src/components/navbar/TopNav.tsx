import { GiMatchTip } from 'react-icons/gi';
import { Navbar, NavbarBrand, NavbarContent } from '@heroui/navbar';
import Link from 'next/link';
import { Button } from '@heroui/button';
import NavLink from '@/components/NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';
import FiltersWrapper from './FiltersWrapper';
import SwitchButton from '@/components/SwitchButton';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function TopNav({ locale }: { locale: string }) {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  const translation = await getTranslations({ locale, namespace: 'Nav' });
  const adminLinks = [{ href: '/admin/moderation', label: 'Photo Moderation' }];

  const memberLinks = [
    { href: '/members', label: translation('members') },
    { href: '/lists', label: translation('lists') },
    { href: '/messages', label: translation('messages') },
  ];
  const links = session?.user.role === 'ADMIN' ? adminLinks : memberLinks;

  return (
    <>
      <Navbar
        maxWidth={'full'}
        className="w-full overflow-x-hidden bg-gradient-to-r from-purple-400 to-purple-700"
        classNames={{
          wrapper: 'px-1 sm:px-2',
          item: [
            'text-sm sm:text-xl',
            'text-white',
            'uppercase',
            'data-[active=true]:text-yellow-200',
          ],
        }}
      >
        <NavbarBrand as={Link} href={`/${locale}`} className="gap-2">
          <GiMatchTip className="text-3xl text-gray-200 md:text-5xl" />
          <div className="hidden items-center text-xl font-bold leading-none sm:flex md:text-3xl">
            <span className="text-gray-900">Next</span>
            <span className="ml-1 text-gray-200">Match</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center">
          {session &&
            links.map((item) => <NavLink key={item.href} href={item.href} label={item.label} />)}
        </NavbarContent>
        <SwitchButton />
        <LanguageSwitcher />
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <UserMenu
              userInfo={{
                name: session?.user?.name ?? null,
                image: session?.user?.image ?? null,
              }}
            />
          ) : (
            <>
              <Button as={Link} href={'/login'} variant={'bordered'} className={'text-white'}>
                {translation('login')}
              </Button>
              <Button as={Link} href={'/register'} variant={'bordered'} className={'text-white'}>
                {translation('register')}
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <FiltersWrapper />
    </>
  );
}
