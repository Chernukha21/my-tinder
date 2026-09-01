import { ReactNode } from 'react';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import { Card } from '@heroui/card';
import { getAuthUserId } from '@/app/actions/authActions';
import MemberSideBar from '@/app/[locale]/members/MemberSideBar';
import { getTranslations } from 'next-intl/server';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const userId = await getAuthUserId();
  const { locale } = await params;
  const translation = await getTranslations({ locale, namespace: 'EditProfile' });
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/edit`;

  const navLinks = [
    { label: `${translation('editProfile')}`, href: `${basePath}` },
    { label: `${translation('updatePhotos')}`, href: `${basePath}/photos` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
        <div className="col-span-1 sm:col-span-3">
          <MemberSideBar member={member} navLinks={navLinks} />
        </div>

        <div className="col-span-1 sm:col-span-9">
          <Card className="w-full">{children}</Card>
        </div>
      </div>
    </div>
  );
}
