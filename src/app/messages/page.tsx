import React from 'react';
import MessageSideBar from "@/app/messages/MessageSideBar";
import {getMessagesByContainer} from "@/app/actions/messageActions";
import MessagesTable from "@/app/messages/MessagesTable";
import {auth} from "@/auth";

const MessagesPage = async ({searchParams}: { searchParams: Promise<{ container: string }> }) => {
    const {container} = await searchParams;
    const session = await auth();
    const currentUserId = session?.user?.id;
    const messages = await getMessagesByContainer(container);
    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
            <div className="col-span-3">
                <MessageSideBar/>
            </div>

            <div className="col-span-9">
                <MessagesTable initialMessages={messages} currentUserId={currentUserId ?? ""}/>
            </div>
        </div>
    );
};

export default MessagesPage;