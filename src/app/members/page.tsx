import React from 'react';
import {getMembers} from "@/app/actions/memberActions";
import MemberCard from "@/app/members/MemberCard";
import {fetchCurrentUserLikeIds} from "@/app/actions/likeActons";

const MembersPage = async () => {
    const members = await getMembers();
    const likeIds = await fetchCurrentUserLikeIds();
    console.log(likeIds);
    return (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {members && members?.map(member => <MemberCard key={member.id} member={member} likeIds={likeIds} />)}
        </div>
    );
};

export default MembersPage;