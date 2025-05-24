import {Card, Image, CardFooter} from "@heroui/react";
import Link from "next/link";
import {calculateAge} from "@/lib/util";
import {Member} from "@prisma/client";

type Props = {
    member: Member
}

const MemberCard = ({member}: Props) => {
    return (
        <Card fullWidth className="relative z-50" as={Link} href={`/members/${member.id}`} isPressable>
            <Image src={member.image || '/images/user.png'} alt={member.name} isZoomed width={300} className="aspect-square object-cover"/>
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