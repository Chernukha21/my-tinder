import React from 'react';
import { getUnapprovedPhotos } from '@/app/actions/adminActions';
import { Divider } from '@heroui/react';
import MemberPhotos from '@/components/MemberPhotos';

export const dynamic = 'force-dynamic';

const PhotoModerationPage = async () => {
  const photos = await getUnapprovedPhotos();
  console.log(photos);
  return (
    <div className="mt-10 flex flex-col gap-3">
      <h3 className="text-2xl">Photos awaiting moderation</h3>
      <Divider />
      <MemberPhotos photos={photos} />
    </div>
  );
};

export default PhotoModerationPage;
