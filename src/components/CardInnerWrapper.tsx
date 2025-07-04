import React from 'react';
import {CardBody, CardFooter, CardHeader, Divider} from "@heroui/react";

type Props = {
    header: React.ReactNode | string;
    body: React.ReactNode;
    footer?: React.ReactNode;
}

const CardInnerWrapper = ({header, body, footer}: Props) => {
    return (
        <>
            <CardHeader>
                {typeof header === 'string' ? (
                    <div className="text-2xl font-semibold text-secondary">
                        {header}
                    </div>
                ) : (<>{header}</>)
                }
            </CardHeader>
            <Divider/>
            <CardBody className="p-4">
                {body}
            </CardBody>
            {footer && (
                <CardFooter>{footer}</CardFooter>
            )}
        </>
    );
};

export default CardInnerWrapper;