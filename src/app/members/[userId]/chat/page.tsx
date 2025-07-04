import CardInnerWrapper from '@/components/CardInnerWrapper';
import ChatForm from './ChatForm';
import {getMessageThread} from '@/app/actions/messageActions';
import MessageBox from './MessageBox';
import {getAuthUserId} from '@/app/actions/authActions';
import {getMemberById} from "@/app/actions/memberActions";

export default async function ChatPage({params}: { params: Promise<{ userId: string }> }) {
    const currentUserId = await getAuthUserId();
    const {userId: memberId} = await params;

    const member = await getMemberById(memberId);

    if (!member) {
        return (
            <CardInnerWrapper
                header="Chat"
                body={<div>Member not found.</div>}
                footer={null}
            />
        );
    }

    const messagesResult = await getMessageThread(member.userId);
    const messages = messagesResult.status === "success" ? messagesResult.data : [];

    const body = (
        <div>
            {messages && messages.length === 0 ? (
                "No messages to display"
            ) : (
                <div>
                    {messages && messages.map((message) => (
                        <MessageBox
                            key={message.id}
                            message={message}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <CardInnerWrapper header="Chat" body={body} footer={<ChatForm/>}/>
    );
}