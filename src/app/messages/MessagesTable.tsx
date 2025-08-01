"use client";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,} from "@heroui/table";
import {MessageDto} from "@/types";
import {Card} from "@heroui/card";
import MessageTableCell from "@/app/messages/MessageTableCell";
import {useMessages} from "@/store/useMessages";
import {Button} from "@heroui/button";

type Props = {
    initialMessages: MessageDto[],
    currentUserId: string;
    nextCursor?: string;
}

export default function MessagesTable({initialMessages, nextCursor}: Props) {
    const {
        deleteMessage,
        isDeleting,
        selectRow,
        isOutBox,
        columns,
        messages,
        loadMore, hasMore, loadingMore
    } = useMessages(initialMessages, nextCursor);
    return (
        <div className="flex flex-col h-[80vh] ">
            <Card>
                <Table
                    aria-label="Table with messages"
                    selectionMode="single"
                    onRowAction={key => selectRow(key)}
                    shadow="none"
                    className="flex flex-col gap-3 h-[80vh] overflow-auto"
                >
                    <TableHeader columns={columns}>
                        {column => (
                            <TableColumn
                                key={column.key}
                                width={
                                    column.key === 'text'
                                        ? '50%'
                                        : undefined
                                }
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={messages}
                        emptyContent="No messages for this container"
                    >
                        {item => (
                            <TableRow
                                key={item.id}
                                className="cursor-pointer"
                            >
                                {columnKey => (
                                    <TableCell
                                        className={`${
                                            !item.dateRead &&
                                            !isOutBox
                                                ? 'font-semibold'
                                                : ''
                                        }`}
                                    >
                                        <MessageTableCell
                                            item={item}
                                            columnKey={
                                                columnKey as string
                                            }
                                            isOutBox={isOutBox}
                                            deleteMessage={
                                                deleteMessage
                                            }
                                            isDeleting={
                                                isDeleting.loading &&
                                                isDeleting.id ===
                                                item.id
                                            }
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="sticky bottom-0 pb-3 me-3 text-right">
                    <Button color="secondary" isLoading={loadingMore} isDisabled={!hasMore} onPress={loadMore}>
                        {hasMore ? 'Load more' : 'No more messages'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
