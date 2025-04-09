import React from 'react';
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";

const ChatPage =  () => {

    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Chat
            </CardHeader>
            <Divider/>
            <CardBody>
               Member messages
            </CardBody>
        </>
    );
};

export default ChatPage;