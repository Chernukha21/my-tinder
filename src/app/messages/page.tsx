import MessageSideBar from "@/app/messages/MessageSideBar";
import {getMessagesByContainer} from "@/app/actions/messageActions";
import MessagesTable from "@/app/messages/MessagesTable";
import {auth} from "@/auth";
import MessagesContainerSwitch from '@/app/messages/MessagesContainerSwitch';

const MessagesPage = async ({searchParams}: { searchParams: Promise<{ container: string }> }) => {
    const {container} = await searchParams;
    const session = await auth();
    const currentUserId = session?.user?.id;
    const {messages, nextCursor} = await getMessagesByContainer(container);
    return (
      <div className="mt-10 h-[80vh]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 h-full">
          <div className="hidden sm:block sm:col-span-3">
            <MessageSideBar />
          </div>

          <div className="sm:col-span-9 min-w-0">
            <div className="sm:hidden mb-3">
              <MessagesContainerSwitch initialContainer={container ?? "inbox"} />
            </div>
            <MessagesTable initialMessages={messages} currentUserId={currentUserId ?? ""} nextCursor={nextCursor} />
          </div>
        </div>
      </div>
    );
};

export default MessagesPage;