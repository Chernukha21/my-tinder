import React from 'react';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { PiSpinnerGap } from 'react-icons/pi';

type Props = {
  loading: boolean;
};

const DeleteButton = ({ loading }: Props) => {
  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      {!loading ? (
        <>
          <AiOutlineDelete
            size={32}
            className="absolute -right-[2px] -top-[2px] cursor-pointer fill-white opacity-80 transition"
          />
          <AiFillDelete size={27} className="fill-red-600" />
        </>
      ) : (
        <PiSpinnerGap size={32} className="animate-spin fill-white" />
      )}
    </div>
  );
};

export default DeleteButton;
