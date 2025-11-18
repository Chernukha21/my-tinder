import {getMemberByUserId, getMembersPhotosByUserId} from "@/app/actions/memberActions";
import {getAuthUserId} from "@/app/actions/authActions";
import {CardBody, CardHeader, Divider} from "@heroui/react";
import MemberPhotoUpload from "@/app/members/edit/photos/MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMembersPhotosByUserId(userId);
    return (
        <>
            <CardHeader className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-secondary">
                    Updating photos page
                </div>
                <MemberPhotoUpload/>
            </CardHeader>
            <Divider/>
            <CardBody>
                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image}/>
            </CardBody>
        </>
    );
}
