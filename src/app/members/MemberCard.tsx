'use client';
import React, { useState } from "react";
import {Card, Image, CardFooter} from "@heroui/react";
import Link from "next/link";
import {calculateAge, transformImageUrl} from "@/lib/util";
import {Member} from "@prisma/client";
import LikeButton from "@/components/LikeButton";
import PresenceDot from "@/components/PresenceDot";
import { toggleLikeMember } from '@/app/actions/likeActons';

type Props = {
    member: Member;
    likeIds: string[];
};

const MemberCard = ({member, likeIds}: Props) => {
    const [hasLiked, setHasLiked] = useState(likeIds.includes(member.userId));
    const [loading, setLoading] = useState(false);

    function preventLinkAction(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }


  async function toggleLike() {
      setLoading(true);
      try {
        await toggleLikeMember(member.userId, hasLiked);
        setHasLiked(!hasLiked);
      }catch (error){
        console.log(error);
      }finally {
        setLoading(false);
      }
  }

    return (
        <Card
            as={Link}
            href={`/members/${member.userId}`}
            isPressable
            className="relative h-[300px] w-full"
        >
            <Image
                removeWrapper
                src={transformImageUrl(member.image) ?? "/images/user.png"}
                alt={member.name ?? "user profile photo"}
                className="z-0 w-full h-full object-cover"
            />

            <div onClick={preventLinkAction}>
                <div className="absolute top-3 right-3 z-50">
                    <LikeButton loading={loading} toggleLike={toggleLike} targetId={member.userId} hasLiked={hasLiked}/>
                </div>
                <div className="absolute top-3 left-3 z-50">
                    <PresenceDot member={member}/>
                </div>
            </div>

            <CardFooter className="flex justify-start overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
                <div className="flex flex-col text-white">
                    <span className="font-semibold">
                      {member.name}, {calculateAge(member.dateOfBirth)}
                    </span>
                    <span className="text-sm">{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MemberCard;