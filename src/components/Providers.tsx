'use client';

import {HeroUIProvider} from '@heroui/react';
import {ReactNode, useCallback, useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {usePresenceChannel} from "@/store/usePresenceChannel";
import {useNotificationChannel} from "@/store/useNotificationChannel";
import useMessageStore from "@/store/useMessageStore";
import {useShallow} from "zustand/shallow";
import {getUnreadMessagesCount} from "@/app/actions/messageActions";

export default function Providers({children, userId, profileComplete}: {
    children: ReactNode,
    userId: string | null,
    profileComplete: boolean
}) {
    const {updateUnreadCount} = useMessageStore(useShallow(
        state => ({
            updateUnreadCount: state.updateUnreadCount,
        })
    ));

    const setUnreadCount = useCallback((amount: number) => {
        updateUnreadCount(amount);
    }, [updateUnreadCount])

    useEffect(() => {
        if (!userId) return;
        getUnreadMessagesCount().then(count => setUnreadCount(count));
    }, [setUnreadCount, userId]);

    usePresenceChannel(userId, profileComplete);
    useNotificationChannel(userId, profileComplete);
    return (
        <HeroUIProvider>
            <ToastContainer position="top-right" className="z-50"/>
            {children}
        </HeroUIProvider>
    );
}
