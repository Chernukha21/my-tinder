"use client";
import {Member} from "@prisma/client";
import {Card, CardBody, Divider, Image, Button, CardFooter} from "@heroui/react";
import {calculateAge, transformImageUrl} from "@/lib/util";
import Link from "next/link";
import {usePathname} from "next/navigation";
import PresenceDot from "@/components/PresenceDot";


type Props = {
    member: Member;
    navLinks: { label: string, href: string }[]
}

const MemberSideBar = ({member, navLinks}: Props) => {
    const pathName = usePathname();

    return (
        <Card className="w-full mt-10 items-center h-[80vh] mb-10">
            <Image
                src={transformImageUrl(member.image) || '/images/user.png'}
                alt={member.name || 'user profile'}
                width={200}
                height={200}
                className="rounder-full mt-6 aspect-square object-cover"
            />
            <CardBody className="h-[50vh] overflow-hidden">
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <div className="text-2xl">
                            {member.name},{' '}{calculateAge(member.dateOfBirth)}
                        </div>
                        <div>
                            <PresenceDot member={member}/>
                        </div>
                    </div>
                    <div className="text-sm text-neutral-500">
                        {member.city}, {member.country}
                    </div>
                </div>
                <Divider className="my-3"/>
                <nav className="flex flex-col gap-4 p-4 ml-4 text-2xl">
                    {navLinks.map(link =>
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`block rounded ${pathName === link.href ? 'text-secondary' : 'hover:text-secondary/50'}`}
                        >
                            {link.label}
                        </Link>)
                    }
                </nav>
            </CardBody>
            <CardFooter className="mb-5">
                <Button as={Link} fullWidth color="secondary" href="/members" variant="bordered" className="mt-4">
                    Go back
                </Button>
            </CardFooter>
        </Card>
    );
};

export default MemberSideBar;