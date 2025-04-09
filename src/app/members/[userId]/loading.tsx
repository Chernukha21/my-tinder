import React from 'react';
import {Spinner} from "@heroui/spinner";

const Loading = () => {
    return (
        <div className="flex justify-center items-center vertical-center">
            <Spinner color="primary" label="Loading..." labelColor="primary"/>
        </div>
    );
};

export default Loading;