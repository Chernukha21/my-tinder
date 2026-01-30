import React from 'react';
import {CardBody, CardHeader, Divider} from "@heroui/react";
import {getMembersPhotosByUserId} from "@/app/actions/memberActions";
import MemberPhotos from "@/components/MemberPhotos";

const PhotosPage = async ({params}: { params: Promise<{ userId: string }> }) => {
    const {userId} = await params;
    // const membersPhotos = await getMembersPhotosById(userId);
    const membersPhotos = await getMembersPhotosByUserId(userId);

    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Photos
            </CardHeader>
            <Divider/>
            <CardBody>
                <MemberPhotos photos={membersPhotos}/>
            </CardBody>
        </>
    );
};

export default PhotosPage;