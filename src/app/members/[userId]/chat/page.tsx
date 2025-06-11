import React from 'react';
import {CardBody, CardHeader, Divider} from "@heroui/react";

const ChatPage = () => {
    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Profile
            </CardHeader>
            <Divider/>
            <CardBody className="p-4">
                Messages
            </CardBody>
        </>
    );
};

export default ChatPage;