import React from 'react';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import EditForm from '@/app/members/edit/EditForm';
import CardInnerWrapper from '@/components/CardInnerWrapper';

const EditMemberPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  return (
    <CardInnerWrapper header={`Edit ${member.name}'s page`} body={<EditForm member={member} />} />
  );
};

export default EditMemberPage;
