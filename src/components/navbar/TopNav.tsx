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
    {href: '/members', label: 'Matches'},
    {href: '/lists', label: 'Lists'},
    {href: '/messages', label: 'Messages'},
  ]

  const adminLinks = [
    {href: '/admin/moderation', label: 'Photo Moderation'}
  ];

  const links = session?.user.role === 'ADMIN' ? adminLinks : memberLinks;

  return (
    <>
      <Navbar maxWidth={'xl'}
              className="bg-gradient-to-r from-purple-400 to-purple-700"
              classNames={{
                item: [
                  'text-xl',
                  'text-white',
                  'uppercase',
                  'data-[active=true]:text-yellow-200'
                ]
              }}
      >
        <NavbarBrand as={Link} href="/">
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
            <GiMatchTip
              className="text-gray-200 text-3xl md:text-5xl"/>

            <div className="font-bold flexflex-colitems-center leading-none text-xl md:flex-row md:text-3xl">
              <span className="text-gray-900">Next</span>
              <span className="text-gray-200 md:ml-1">Match</span>
            </div>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center">
          {session && links.map(item => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <UserMenu userInfo={{
                name: session?.user?.name ?? null,
                image: session?.user?.image ?? null,
              }}
            />
          ) : (
            <>
              <Button as={Link} href={'/login'} variant={'bordered'} className={'text-white'}>Login</Button>
              <Button as={Link} href={'/register'} variant={'bordered'}
                      className={'text-white'}>Register</Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <FiltersWrapper />
    </>

  );
}