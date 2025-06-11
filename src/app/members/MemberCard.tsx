'use client';
import React from "react";
import {Card, Image, CardFooter} from "@heroui/react";
import Link from "next/link";
import {calculateAge, transformImageUrl} from "@/lib/util";
import {Member} from "@prisma/client";
import LikeButton from "@/components/LikeButton";

type Props = {
    member: Member
    likeIds: string[]
}

const MemberCard = ({member, likeIds}: Props) => {
    const hasLiked = likeIds.includes(member.userId);

    function preventLinkAction(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Card fullWidth className="relative z-50" as={Link} href={`/members/${member.id}`} isPressable>
            <Image src={transformImageUrl(member.image) || '/images/user.png'} alt={member.name} isZoomed width={300}
                   className="aspect-square object-cover"/>
            <div onClick={preventLinkAction}>
                <div className="absolute top-3 right-3 z-50">
                    <LikeButton targetId={member.userId} hasLiked={hasLiked}/>
                </div>
            </div>
            <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
                <div className="flex flex-col text-white">
                    <span className="font-semibold">{member.name}, {calculateAge(member.dateOfBirth)}</span>
                    <span className="text-sm">{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MemberCard;