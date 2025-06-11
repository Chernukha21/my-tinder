import React from 'react';
import {CardBody, CardHeader, Divider, Image} from "@heroui/react";
import {getMembersPhotosById} from "@/app/actions/memberActions";

const PhotosPage = async ({params}: { params: Promise<{ userId: string }> }) => {
    const {userId} = await params;
    const membersPhotos = await getMembersPhotosById(userId);
    console.log(membersPhotos);
    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Photos
            </CardHeader>
            <Divider/>
            <CardBody className="grid grid-cols-5 gap-3">
                {membersPhotos && membersPhotos
                    .map(photo =>
                        <Image key={photo.url}
                               src={photo.url}
                               width={300}
                               alt="Member`s photo"
                               className="object-cover aspect-square"
                        />)}
            </CardBody>
        </>
    );
};

export default PhotosPage;