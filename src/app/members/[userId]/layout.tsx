import {ReactNode} from "react";
import {getMemberById, getMemberByUserId} from "@/app/actions/memberActions";
import MemberSideBar from "@/app/members/MemberSideBar";
import {notFound} from "next/navigation";
import {Card} from "@heroui/react";

const MemberDetailsLayout = async ({children, params}: {
    children: ReactNode,
    params: Promise<{ userId: string }>
}) => {
    const {userId} = await params;
    const member = await getMemberByUserId(userId);
    if (!member) return notFound();

    const basePath = `/members/${member.userId}`;
    
    const navLinks = [
        {label: 'Profile', href: `${basePath}`},
        {label: 'Photos', href: `${basePath}/photos`},
        {label: 'Chat', href: `${basePath}/chat`},
    ];

    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh]">
            <div className="col-span-3">
                <MemberSideBar member={member} navLinks={navLinks}/>
            </div>
            <div className="col-span-9">
                <Card className="w-full mt-10 h-[80vh]">
                    {children}
                </Card>
            </div>
        </div>
    );
};

export default MemberDetailsLayout;