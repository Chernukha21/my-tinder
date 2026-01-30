import { ReactNode } from 'react';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSideBar from '@/app/members/MemberSideBar';
import { notFound } from 'next/navigation';
import { Card } from '@heroui/react';
import MemberDetailsShell from '@/app/members/[userId]/MemberDetailsShell';

const MemberDetailsLayout = async ({
                                     children,
                                     params,
                                   }: {
  children: ReactNode;
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/${member.userId}`;

  const navLinks = [
    { label: 'Profile', href: `${basePath}` },
    { label: 'Photos', href: `${basePath}/photos` },
    { label: 'Chat', href: `${basePath}/chat` },
  ];

  return (
    <MemberDetailsShell sidebar={<MemberSideBar member={member} navLinks={navLinks} />}>
      <Card className="w-full h-full">{children}</Card>
    </MemberDetailsShell>
  );
};

export default MemberDetailsLayout;
