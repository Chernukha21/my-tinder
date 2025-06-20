import React from 'react';
import {AiFillDelete, AiOutlineDelete} from "react-icons/ai";
import {PiSpinnerGap} from "react-icons/pi";

type Props = {
    loading: boolean
}

const DeleteButton = ({loading}: Props) => {
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer">
            {!loading ? (
                <>
                    <AiOutlineDelete size={32}
                                     className="fill-white absolute -top-[2px] -right-[2px] opacity-80 transition cursor-pointer"/>
                    <AiFillDelete size={27} className="fill-red-600"/>
                </>
            ) : (
                <PiSpinnerGap size={32} className="fill-white animate-spin"/>
            )}
        </div>
    );
};

export default DeleteButton;