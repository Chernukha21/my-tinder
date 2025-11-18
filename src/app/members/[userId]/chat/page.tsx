import CardInnerWrapper from '@/components/CardInnerWrapper';
import ChatForm from './ChatForm';
import {getMessageThread} from '@/app/actions/messageActions';
import {getAuthUserId} from '@/app/actions/authActions';
import {getMemberByUserId} from "@/app/actions/memberActions";
import MessageList from "@/app/members/[userId]/chat/MessageList";
import {createChatId} from "@/lib/util";
import {notFound} from "next/navigation";

export default async function ChatPage({params}: { params: Promise<{ userId: string }> }) {
    const currentUserId = await getAuthUserId();
    const {userId} = await params;
    const member = await getMemberByUserId(userId);
    if (!member) return notFound();
    const messagesResult = await getMessageThread(member.userId);

    const chatId = createChatId(currentUserId, userId);

    if (!member) {
        return (
            <CardInnerWrapper
                header="Chat"
                body={<div>Member not found.</div>}
                footer={null}
            />
        );
    }

    if (!messagesResult) return;

    return (
        <CardInnerWrapper
            header="Chat"
            body={<MessageList initialMessages={messagesResult} chatId={chatId}
                               currentUserId={currentUserId}/>}
            footer={<ChatForm/>}
        />
    );
}