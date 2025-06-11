"use client";
import {Member} from "@prisma/client";
import {Card, CardBody, Divider, Image, Button, CardFooter} from "@heroui/react";
import {calculateAge, transformImageUrl} from "@/lib/util";
import Link from "next/link";
import {usePathname} from "next/navigation";


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
            <CardBody className="h-[50vh] overflow-y-hidden">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-semibold">{member.name}, {calculateAge(member.dateOfBirth)}</h1>
                    <span className="text-sm">{member.city}</span>
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