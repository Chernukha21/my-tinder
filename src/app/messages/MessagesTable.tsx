"use client";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/table";
import {useRouter, useSearchParams} from "next/navigation";
import {MessageDto} from "@/types";
import {Key, useCallback, useState} from "react";
import {Card} from "@heroui/card";
import {Avatar} from "@heroui/avatar";
import {Button} from "@heroui/button";
import {AiFillDelete} from "react-icons/ai";
import {deleteMessage} from "@/app/actions/messageActions";
import {truncateString} from "@/lib/util";

type Props = {
    messages: MessageDto[],
    currentUserId: string
}

export default function MessagesTable({messages}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isOutBox = searchParams.get('container') === 'outbox';
    const [isDeleting, setDeleting] = useState({
        id: '', loading: false
    });

    const columns = [
        {key: isOutBox ? 'recipientName' : 'senderName', label: isOutBox ? 'Recipient' : 'Sender'},
        {key: 'text', label: 'Message'},
        {key: 'created', label: isOutBox ? 'Date sent' : 'Date received'},
        {key: 'actions', label: 'Actions'}
    ]

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setDeleting({id: message.id, loading: true});
        await deleteMessage(message.id, isOutBox);
        router.refresh();
        setDeleting({id: '', loading: false});
    }, [isOutBox, router]);

    function handleRowSelect(key: Key) {
        const message = messages.find((m) => m.id === key);
        if (!message) return;
        router.push(`/members/${message.otherMemberId}/chat`);
    }

    const renderCell = useCallback((item: MessageDto, columnKey: keyof MessageDto) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case 'recipientName':
            case 'senderName':
                return (
                    <div
                        className='flex items-center gap-2 cursor-pointer'>
                        <Avatar alt="Image of member"
                                src={(isOutBox ? item.recipientImage : item.senderImage) || '/images/user.png'}/>
                        <span>{cellValue}</span>
                    </div>
                )
            case 'text':
                return (
                    <div>
                        {truncateString(cellValue, 80)}
                    </div>
                )
            case 'created':
                return cellValue;
            default:
                return (
                    <Button isIconOnly variant="light" onPress={() => handleDeleteMessage(item)}
                            isLoading={isDeleting.id === item.id && isDeleting.loading}>
                        <AiFillDelete size={24} className="text-danger"/>
                    </Button>
                )
        }
    }, [isOutBox, isDeleting.id, isDeleting.loading, handleDeleteMessage]);

    return (
        <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
            <Table aria-label="Messages table" selectionMode="single" onRowAction={(key) => handleRowSelect(key)}
                   shadow="none">
                <TableHeader columns={columns}>
                    {(column) =>
                        <TableColumn key={column.key}
                                     width={column.key === 'text' ? '50%' : undefined}
                        >
                            {column.label}
                        </TableColumn>}
                </TableHeader>
                <TableBody items={messages}>
                    {(item) => (
                        <TableRow key={item.id} className="hover:cursor-pointer">
                            {(columnKey) => <TableCell
                                className={`${!item.dateRead && !isOutBox ? 'font-semibold' : ''}`}>
                                {renderCell(item, columnKey as keyof MessageDto)}
                            </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
