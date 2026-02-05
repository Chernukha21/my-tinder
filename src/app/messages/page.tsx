import MessageSideBar from '@/app/messages/MessageSideBar';
import { getMessagesByContainer } from '@/app/actions/messageActions';
import MessagesTable from '@/app/messages/MessagesTable';
import { auth } from '@/auth';
import MessagesContainerSwitch from '@/app/messages/MessagesContainerSwitch';

const MessagesPage = async ({ searchParams }: { searchParams: Promise<{ container: string }> }) => {
  const { container } = await searchParams;
  const session = await auth();
  const currentUserId = session?.user?.id;
  const { messages, nextCursor } = await getMessagesByContainer(container);
  return (
    <div className="mt-10 h-[80vh]">
      <div className="grid h-full grid-cols-1 gap-5 sm:grid-cols-12">
        <div className="hidden sm:col-span-3 sm:block">
          <MessageSideBar />
        </div>

        <div className="min-w-0 sm:col-span-9">
          <div className="mb-3 sm:hidden">
            <MessagesContainerSwitch initialContainer={container ?? 'inbox'} />
          </div>
          <MessagesTable
            initialMessages={messages}
            currentUserId={currentUserId ?? ''}
            nextCursor={nextCursor}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
