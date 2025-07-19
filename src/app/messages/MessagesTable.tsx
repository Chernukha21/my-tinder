"use client";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,} from "@heroui/table";
import {MessageDto} from "@/types";
import {Card} from "@heroui/card";
import MessageTableCell from "@/app/messages/MessageTableCell";
import {useMessages} from "@/store/useMessages";

type Props = {
    initialMessages: MessageDto[],
    currentUserId: string;
}

export default function MessagesTable({initialMessages}: Props) {
    const {deleteMessage, isDeleting, selectRow, isOutBox, columns, messages} = useMessages(initialMessages);
    return (
        <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
            <Table
                aria-label="Table with messages"
                selectionMode="single"
                onRowAction={key => selectRow(key)}
                shadow="none"
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
        </Card>
    );
}
