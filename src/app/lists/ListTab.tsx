'use client';
import React, {Key, useTransition} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Tabs} from "@heroui/tabs";
import {Tab} from "@heroui/react";
import {Member} from "@prisma/client";
import MemberCard from "@/app/members/MemberCard";
import Loading from "@/app/loading";

type Props = {
    members: Member[],
    likeIds: string[]
}

const ListTab = ({members, likeIds}: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const [isPending, startTransition] = useTransition();


    const tabs = [
        {id: "source", label: "Members I have liked"},
        {id: "target", label: "Members that liked me"},
        {id: "mutual", label: "Mutual likes"},
    ];

    function handleTabChange(key: Key) {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            params.set('type', key.toString());
            router.replace(`${pathName}?${params.toString()}`);
        });
    }

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Like tabs" items={tabs} color="secondary" onSelectionChange={(key) => handleTabChange(key)}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {isPending && <Loading/>}
                        {members.length > 0 ? (
                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
                                {members.map((member) => (
                                    <MemberCard
                                        key={member.id}
                                        member={member}
                                        likeIds={likeIds}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>No members for this filter</div>
                        )}
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default ListTab;