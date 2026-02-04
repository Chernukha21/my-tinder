"use client";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { PiSpinnerGap } from 'react-icons/pi';

type Props = {
    hasLiked: boolean;
    loading: boolean;
    toggleLike: () => void;
}

const LikeButton = ({hasLiked, toggleLike, loading}: Props ) => {

    return (
      <>
        {!loading ? (<div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer ">
          <AiOutlineHeart className="fill-white absolute -top-[2px] -right-[2px]" size={28}/>
          <AiFillHeart className={hasLiked ? 'fill-red-500' : 'fill-neutral-500/70'} size={24}/>
        </div>) : (<PiSpinnerGap size={32} className="fill-white animate-spin"/>)}
      </>
    );
};

export default LikeButton;