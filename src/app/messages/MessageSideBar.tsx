'use client';
import React, {useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {GoInbox} from "react-icons/go";
import {MdOutlineOutbox} from "react-icons/md";
import clsx from "clsx";
import {Chip} from "@heroui/chip";

const MessageSideBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [selected, setSelected] = useState<string>(searchParams.get('outbox') || 'inbox');
    const items = [
        {key: 'inbox', label: 'Inbox', icon: GoInbox, chip: true},
        {key: 'outbox', label: 'Outbox', icon: MdOutlineOutbox, chip: true},
    ]

    function handleSelectItem(key: string) {
        setSelected(key);
        const params = new URLSearchParams();
        params.set('container', key);
        router.replace(`${pathname}?${params}`);
    }

    
    return (
        <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
            {items.map(({key, label, icon: Icon, chip}) => (
                <div key={key} onClick={() => handleSelectItem(key)}
                     className={clsx('flex flex-row items-center rounded-t-lg gap-2 p-3', {
                         'text-secondary font-semibold': selected === key,
                         'text-black hover:text-secondary/70': selected !== key,
                     })}>
                    <Icon size={24}/>
                    <div className="flex justify-between flex-grow">
                        <span>{label}</span>
                        {chip && <Chip color="primary">{items.length}</Chip>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSideBar;