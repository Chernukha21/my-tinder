import React, {ReactNode} from 'react';
import MemberSideBar from "@/app/members/MemberSideBar";
import {notFound} from "next/navigation";
import {Card} from "@heroui/card";
import {getMemberByUserId} from "@/app/actions/memberActions";

const Layout = async ({children, params}:{children: ReactNode, params: Promise<{userId: string}>}) => {
    const {userId} = await params;
    const member = await getMemberByUserId(userId);
    if(!member) return notFound();
    console.log(member);
    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh]">
            <div className="col-span-3">
                <MemberSideBar member={member}/>
            </div>
            <div className="col-span-9">
                <Card className="w-full mt-10 h-[80vh]">
                    {children}
                </Card>
            </div>
        </div>
    );
};

export default Layout;