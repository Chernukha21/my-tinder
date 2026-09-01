import { ReactNode } from 'react';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSideBar from '@/app/[locale]/members/MemberSideBar';
import { notFound } from 'next/navigation';
import { Card } from '@heroui/react';
import MemberDetailsShell from '@/app/[locale]/members/[userId]/MemberDetailsShell';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';

const MemberDetailsLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string; locale: Locale }>;
}) => {
  const { userId, locale } = await params;
  const member = await getMemberByUserId(userId);
  const translation = await getTranslations({ locale, namespace: 'Member' });
  if (!member) return notFound();

  const basePath = `/members/${member.userId}`;

  const navLinks = [
    { label: `${translation('profile')}`, href: `${basePath}` },
    { label: `${translation('photos')}`, href: `${basePath}/photos` },
    { label: `${translation('chat')}`, href: `${basePath}/chat` },
  ];

  return (
    <MemberDetailsShell sidebar={<MemberSideBar member={member} navLinks={navLinks} />}>
      <Card className="h-full w-full">{children}</Card>
    </MemberDetailsShell>
  );
};

export default MemberDetailsLayout;
