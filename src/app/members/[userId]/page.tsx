import {getMemberById} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {CardBody, CardHeader, Divider} from "@heroui/react";


const MemberDetailPage = async ({params}: { params: Promise<{ userId: string }> }) => {
    const {userId} = await params;
    const member = await getMemberById(userId);
    if (!member) return notFound;
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