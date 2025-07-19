'use client';

import usePresenceStore from '@/store/usePresenceStore';
import {Avatar, Badge} from '@heroui/react';
import {useShallow} from "zustand/shallow";

type Props = {
    userId?: string;
    src?: string | null;
};

export default function PresenceAvatar({userId, src}: Props) {
    const members = usePresenceStore(useShallow(
        state => state.members,
    ));

    const isOnline = userId && members.indexOf(userId) !== -1;
    return (
        <Badge
            content=""
            color="success"
            shape="circle"
            isInvisible={!isOnline}
        >
            <Avatar
                src={src || '/images/user.png'}
                alt="User Avatar"
            />
        </Badge>
    );
}
