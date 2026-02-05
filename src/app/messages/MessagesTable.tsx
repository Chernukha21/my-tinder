'use client';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import { MessageDto } from '@/types';
import { Card } from '@heroui/card';
import MessageTableCell from '@/app/messages/MessageTableCell';
import { useMessages } from '@/store/useMessages';
import { Button } from '@heroui/button';
import { useEffect, useState } from 'react';
import { SwipeRowButton } from '@/components/SwipeRowButton';

type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  nextCursor?: string;
};

export default function MessagesTable({ initialMessages, nextCursor }: Props) {
  const {
    deleteMessage,
    isDeleting,
    selectRow,
    isOutbox,
    columns,
    messages,
    loadMore,
    hasMore,
    loadingMore,
  } = useMessages(initialMessages, nextCursor);
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    const onResize = () => setOpenId(null);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setOpenId(null);
  }, [isOutbox]);
  return (
    <div className="flex h-[80vh] flex-col">
      <Card className="h-[80vh] overflow-hidden">
        <div className="h-full overflow-auto sm:hidden">
          <ul className="space-y-2 p-2">
            {messages.map((item) => (
              <li key={item.id} className="rounded-xl border border-default-200 bg-background">
                <SwipeRowButton
                  id={item.id}
                  openId={openId}
                  setOpenId={setOpenId}
                  onOpen={() => selectRow(item.id)}
                  onDelete={() => deleteMessage(item)}
                  disabled={isDeleting.loading && isDeleting.id === item.id}
                >
                  <div className={`p-3 ${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 truncate">
                        {isOutbox ? item.recipientName : item.senderName}
                      </div>
                      <div className="shrink-0 text-xs text-default-400">{item.created}</div>
                    </div>
                  </div>
                </SwipeRowButton>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden h-full overflow-auto sm:block">
          <Table
            aria-label="Table with messages"
            selectionMode="single"
            onRowAction={(key) => selectRow(key)}
            shadow="none"
            className="h-full"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} width={column.key === 'text' ? '50%' : undefined}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={messages} emptyContent="No messages for this page">
              {(item) => (
                <TableRow key={item.id} className="cursor-pointer">
                  {(columnKey) => (
                    <TableCell className={!item.dateRead && !isOutbox ? 'font-semibold' : ''}>
                      <MessageTableCell
                        item={item}
                        columnKey={columnKey as string}
                        isOutBox={isOutbox}
                        deleteMessage={deleteMessage}
                        isDeleting={isDeleting.loading && isDeleting.id === item.id}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="sticky bottom-0 bg-background p-3 text-right">
          <Button
            color="secondary"
            isLoading={loadingMore}
            isDisabled={!hasMore}
            onPress={loadMore}
          >
            {hasMore ? 'Load more' : 'No more messages'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
