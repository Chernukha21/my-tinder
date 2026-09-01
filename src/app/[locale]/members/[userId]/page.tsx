import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import CardInnerWrapper from '@/components/CardInnerWrapper';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function MemberDetailedPage({
  params,
}: {
  params: Promise<{ userId: string; locale: Locale }>;
}) {
  const { userId, locale } = await params;
  const member = await getMemberByUserId(userId);
  const translation = await getTranslations({ locale, namespace: 'Member' });
  if (!member) return notFound();

  return (
    <CardInnerWrapper header={`${translation('profile')}`} body={<div>{member.description}</div>} />
  );
}
