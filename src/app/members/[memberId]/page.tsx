import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {CardBody, CardHeader, Divider} from "@heroui/react";


const MemberDetailPage = async ({params}:{params: Promise<{ memberId: string }>}) => {
    const {memberId} = await params;
    const member = await getMemberByUserId(memberId);
    if (!member) return notFound;
    console.log(member);
    return (
       <>
           <CardHeader className="text-2xl font-semibold text-secondary">
                Profile
           </CardHeader>
           <Divider/>
           <CardBody className="p-4">
               {member.description}
           </CardBody>
       </>
    )
};

export default MemberDetailPage;