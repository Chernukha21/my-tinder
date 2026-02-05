import { GiMatchTip } from 'react-icons/gi';
import { Navbar, NavbarBrand, NavbarContent } from '@heroui/navbar';
import Link from 'next/link';
import { Button } from '@heroui/button';
import NavLink from '@/components/NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';
import { getUserInfoForNav } from '@/app/actions/userActions';
import FiltersWrapper from './FiltersWrapper';

export default async function TopNav() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  const userInfo = isLoggedIn ? await getUserInfoForNav() : null;
  const memberLinks = [
    { href: '/members', label: 'Matches' },
    { href: '/lists', label: 'Lists' },
    { href: '/messages', label: 'Messages' },
  ];

  const adminLinks = [{ href: '/admin/moderation', label: 'Photo Moderation' }];

  const links = session?.user.role === 'ADMIN' ? adminLinks : memberLinks;

  return (
    <>
      <Navbar
        maxWidth={'full'}
        className="w-full overflow-x-hidden bg-gradient-to-r from-purple-400 to-purple-700"
        classNames={{
          wrapper: 'px-3 sm:px-6',
          item: [
            'text-sm sm:text-xl',
            'text-white',
            'uppercase',
            'data-[active=true]:text-yellow-200',
          ],
        }}
      >
        <NavbarBrand as={Link} href="/" className="gap-2">
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
                Login
              </Button>
              <Button as={Link} href={'/register'} variant={'bordered'} className={'text-white'}>
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <FiltersWrapper />
    </>
  );
}
