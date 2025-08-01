import {useRouter, useSearchParams} from "next/navigation";
import {Key, useCallback, useEffect, useRef, useState} from "react";
import {MessageDto} from "@/types";
import {deleteMessage, getMessagesByContainer} from "@/app/actions/messageActions";
import useMessageStore from "@/store/useMessageStore";
import {useShallow} from "zustand/shallow";

export const useMessages = (initialMessages: MessageDto[], nextCursor?: string) => {
    const {set, remove, messages, updateUnreadCount, resetMessages} = useMessageStore(useShallow(
        state => ({
            messages: initialMessages,
            set: state.set,
            remove: state.remove,
            updateUnreadCount: state.updateUnreadCount,
            resetMessages: state.resetMessages,
        })
    ));
    const cursorRef = useRef(nextCursor);
    useEffect(() => {
        set(initialMessages);
        cursorRef.current = nextCursor;
        return () => {
            resetMessages();
        }
    }, [set, initialMessages, resetMessages, nextCursor]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const isOutBox = searchParams.get('container') === 'outbox';
    const container = searchParams.get('container');
    const [isDeleting, setDeleting] = useState({
        id: '', loading: false
    });
    const [loadingMore, setIsLoadingMore] = useState(false);


    const columns = [
        {key: isOutBox ? 'recipientName' : 'senderName', label: isOutBox ? 'Recipient' : 'Sender'},
        {key: 'text', label: 'Message'},
        {key: 'created', label: isOutBox ? 'Date sent' : 'Date received'},
        {key: 'actions', label: 'Actions'}
    ]

    const loadMore = useCallback(async () => {
        if (cursorRef.current) {
            setIsLoadingMore(true);
            const {messages, nextCursor} = await getMessagesByContainer(container, cursorRef.current);
            set(messages);
            cursorRef.current = nextCursor;
            setIsLoadingMore(false);
        }
    }, [set, container]);

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
        messages,
        loadMore,
        loadingMore,
        hasMore: !!cursorRef.current,
    }
}