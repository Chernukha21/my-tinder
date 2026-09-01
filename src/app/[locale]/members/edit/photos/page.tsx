import { getMemberByUserId, getMembersPhotosByUserId } from '@/app/actions/memberActions';
import { getAuthUserId } from '@/app/actions/authActions';
import { CardBody, CardHeader, Divider } from '@heroui/react';
import MemberPhotoUpload from '@/app/[locale]/members/edit/photos/MemberPhotoUpload';
import MemberPhotos from '@/components/MemberPhotos';
import { getTranslations } from 'next-intl/server';

export default async function PhotosPage({ params }: { params: Promise<{ locale: string }> }) {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMembersPhotosByUserId(userId);
  const { locale } = await params;
  const translation = await getTranslations({ locale, namespace: 'EditProfile' });
  return (
    <>
      <CardHeader className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-secondary">{translation('photosPage')}</div>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
      </CardBody>
    </>
  );
}
