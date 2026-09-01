import React from 'react';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import EditForm from '@/app/[locale]/members/edit/EditForm';
import CardInnerWrapper from '@/components/CardInnerWrapper';
import { getTranslations } from 'next-intl/server';

const EditMemberPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  const { locale } = await params;
  const translation = await getTranslations({ locale, namespace: 'EditProfile' });
  return (
    <CardInnerWrapper
      header={translation('editNamePage', { name: member.name })}
      body={<EditForm member={member} />}
    />
  );
};

export default EditMemberPage;
