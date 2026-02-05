import React from 'react';
import ListTab from '@/app/lists/ListTab';
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '@/app/actions/likeActons';

const ListsPage = async ({ searchParams }: { searchParams: Promise<{ type: string }> }) => {
  const { type } = await searchParams;
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);
  return (
    <div>
      <ListTab members={members} likeIds={likeIds} />
    </div>
  );
};

export default ListsPage;
