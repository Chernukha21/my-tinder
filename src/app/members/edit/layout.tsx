import { ReactNode } from 'react';
import {getMemberByUserId} from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import { Card } from '@heroui/card';
import {getAuthUserId, getUserById} from '@/app/actions/authActions';
import MemberSideBar from "@/app/members/MemberSideBar";


export default async function Layout({ children }: { children: ReactNode }) {
    const userId = await getAuthUserId();

    const member = await getMemberByUserId(userId);
    if (!member) return notFound();

    const basePath = `/members/edit`;

    const navLinks = [
        { label: 'Edit Profile', href: `${basePath}` },
        { label: 'Update Photos', href: `${basePath}/photos` },
    ];

    return (
        <div className='grid grid-cols-12 gap-5 h-[80vh]'>
            <div className='col-span-3'>
                <MemberSideBar member={member} navLinks={navLinks} />
            </div>
            <div className='col-span-9'>
                <Card className='w-full mt-10 h-[80vh]'>{children}</Card>
            </div>
        </div>
    );
}