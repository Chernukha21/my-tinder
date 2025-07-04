import {getMemberById} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import CardInnerWrapper from "@/components/CardInnerWrapper";


const MemberDetailPage = async ({params}: { params: Promise<{ userId: string }> }) => {
    const {userId} = await params;
    const member = await getMemberById(userId);
    if (!member) return notFound;
    return (
        <CardInnerWrapper header="Profile" body={<div>{member.description}</div>}/>
    )
};

export default MemberDetailPage;