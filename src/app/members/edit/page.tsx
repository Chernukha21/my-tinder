import React from 'react';
import {getAuthUserId} from "@/app/actions/authActions";
import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {CardBody, CardHeader, Divider} from "@heroui/react";
import EditForm from "@/app/members/edit/EditForm";

const EditMemberPage = async () => {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    if (!member) return notFound();

    return (
        <>
            <CardHeader className='flex flex-row justify-between items-center'>
                Edit {member.name}'s page
            </CardHeader>
            <Divider/>
            <CardBody>
                <EditForm member={member}/>
            </CardBody>
        </>
    );
};

export default EditMemberPage;