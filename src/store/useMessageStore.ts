import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {MessageDto} from "@/types";

type MessageState = {
    messages: MessageDto[];
    unreadCount: number;
    add: (message: MessageDto) => void;
    remove: (id: string) => void;
    set: (messages: MessageDto[]) => void;
    updateUnreadCount: (amount: number) => void;
    resetMessages: () => void;
};

const useMessageStore = create<MessageState>()(
    devtools(
        set => ({
            messages: [],
            unreadCount: 0,
            add: message => set(state => ({messages: [message, ...state.messages]})),
            remove: id => set(state => ({messages: state.messages.filter(message => message.id !== id)})),
            set: messages => set(state => {
                const map = new Map([...state.messages, ...messages].map(message => [message.id, message]));
                const uniqueMessages = Array.from(map.values());
                return {messages: uniqueMessages};
            }),
            updateUnreadCount: (amount: number) => set(state => ({unreadCount: state.unreadCount + amount})),
            resetMessages: () => set({messages: []}),
        }),
        {name: 'MessageStore'},
    ),
);

export default useMessageStore;
