'use client';

import {Member} from '@prisma/client';
import {Button, Card, CardBody, CardFooter, Divider,} from '@heroui/react';
import {calculateAge, transformImageUrl} from '@/lib/util';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import PresenceDot from '@/components/PresenceDot';
import ResponsiveImage from '@/components/ResponsiveImage';

type Props = {
  member: Member;
  navLinks: { label: string; href: string }[];
};

const MemberSideBar = ({ member, navLinks }: Props) => {
  const pathName = usePathname();

  return (
    <Card className="w-full h-full flex flex-col items-center">
        <div id="member-sidebar-sentinel" style={{ height: 1, width: 1 }} />
      <ResponsiveImage
        src={transformImageUrl(member.image) || '/images/user.png'}
        alt={member.name || 'user profile'}
        aspect="square"
        className="rounded-md overflow-hidden"
        imgClassName="rounded-md"
      />
      <CardBody className="flex-1 w-full">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <div className="text-2xl">
              {member.name}, {calculateAge(member.dateOfBirth)}
            </div>
            <PresenceDot member={member} />
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>

        <Divider className="my-2 lg:my-3" />

        <nav className="flex flex-col gap-2 p-2 ml-2 text-sm md:text-xl lg:text-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`block rounded ${
                pathName === link.href
                  ? 'text-secondary'
                  : 'hover:text-secondary/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </CardBody>

      <CardFooter className="w-full pb-5">
        <Button
          as={Link}
          fullWidth
          color="secondary"
          href="/members"
          variant="bordered"
          className="mt-2"
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberSideBar;
