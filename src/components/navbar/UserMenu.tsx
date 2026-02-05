'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown';

import { Avatar } from '@heroui/avatar';
import Link from 'next/link';
import { signOutUser } from '@/app/actions/authActions';
import { transformImageUrl } from '@/lib/util';

type Props = {
  userInfo: { name: string | null; image: string | null } | null;
};

export default function UserMenu({ userInfo }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={userInfo?.name || 'user avatar'}
          size="sm"
          src={transformImageUrl(userInfo?.image) || '/images/user.png'}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="user actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            key="signInAs"
            isReadOnly
            as="span"
            className="flex h-14 flex-row"
            aria-label="username"
          >
            Signed in as {userInfo?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="editProfile" as={Link} href="/members/edit">
          Edit profile
        </DropdownItem>
        <DropdownItem key="logOut" color="danger" onPress={async () => signOutUser()}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
