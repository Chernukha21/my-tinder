import {ReactNode} from "react";
import {getMemberByUserId} from "@/app/actions/memberActions";
import MemberSideBar from "@/app/members/MemberSideBar";
import {notFound} from "next/navigation";
import {Card} from "@heroui/react";

const MemberDetailsLayout = async ({children, params}:{children: ReactNode, params: {memberId: string}}) => {
    const {memberId} = await params;
    const member = await getMemberByUserId(memberId);
    if(!member) return notFound;
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

export default MemberDetailsLayout;