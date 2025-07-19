import {useRouter, useSearchParams} from "next/navigation";
import {Key, useCallback, useEffect, useState} from "react";
import {MessageDto} from "@/types";
import {deleteMessage} from "@/app/actions/messageActions";
import useMessageStore from "@/store/useMessageStore";
import {useShallow} from "zustand/shallow";

export const useMessages = (initialMessages: MessageDto[]) => {
    const {set, add, remove, messages, updateUnreadCount} = useMessageStore(useShallow(
        state => ({
            messages: initialMessages,
            set: state.set,
            add: state.add,
            remove: state.remove,
            updateUnreadCount: state.updateUnreadCount,
        })
    ));

    useEffect(() => {
        set(initialMessages);
        return () => {
            set([]);
        }
    }, [set, initialMessages]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const isOutBox = searchParams.get('container') === 'outbox';
    const [isDeleting, setDeleting] = useState({
        id: '', loading: false
    });

    const columns = [
        {key: isOutBox ? 'recipientName' : 'senderName', label: isOutBox ? 'Recipient' : 'Sender'},
        {key: 'text', label: 'Message'},
        {key: 'created', label: isOutBox ? 'Date sent' : 'Date received'},
        {key: 'actions', label: 'Actions'}
    ]

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setDeleting({id: message.id, loading: true});
        await deleteMessage(message.id, isOutBox);
        remove(message.id);
        if (!message.dateRead && !isOutBox) updateUnreadCount(-1);
        setDeleting({id: '', loading: false});
    }, [isOutBox, remove, setDeleting, updateUnreadCount]);

    function handleRowSelect(key: Key) {
        const message = messages.find((m) => m.id === key);
        if (!message) return;
        router.push(`/members/${message.otherMemberId}/chat`);
    }

    return {
        columns,
        selectRow: handleRowSelect,
        deleteMessage: handleDeleteMessage,
        isDeleting,
        isOutBox,
        messages
    }
}