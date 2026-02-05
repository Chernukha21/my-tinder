'use client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { PiSpinnerGap } from 'react-icons/pi';

type Props = {
  hasLiked: boolean;
  loading: boolean;
  toggleLike: () => void;
};

const LikeButton = ({ hasLiked, toggleLike, loading }: Props) => {
  return (
    <>
      {!loading ? (
        <div onClick={toggleLike} className="relative cursor-pointer transition hover:opacity-80">
          <AiOutlineHeart className="absolute -right-[2px] -top-[2px] fill-white" size={28} />
          <AiFillHeart className={hasLiked ? 'fill-red-500' : 'fill-neutral-500/70'} size={24} />
        </div>
      ) : (
        <PiSpinnerGap size={32} className="animate-spin fill-white" />
      )}
    </>
  );
};

export default LikeButton;
