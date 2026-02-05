import React, { useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { PiSpinnerGap } from 'react-icons/pi';

type Props = {
  selected: boolean;
  loading: boolean;
};

const StarButton = ({ selected, loading }: Props) => {
  useEffect(() => {
    const onScroll = () => console.log('window.scrollY =', window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      {!loading ? (
        <>
          <AiOutlineStar
            size={32}
            className="absolute -right-[2px] -top-[2px] cursor-pointer fill-white opacity-80 transition"
          />
          <AiFillStar size={27} className={selected ? 'fill-yellow-200' : 'fill-neutral-500/70'} />
        </>
      ) : (
        <PiSpinnerGap size={32} className="animate-spin fill-white" />
      )}
    </div>
  );
};

export default StarButton;
