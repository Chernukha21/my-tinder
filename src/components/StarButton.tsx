import React, { useEffect } from 'react';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {PiSpinnerGap} from "react-icons/pi";

type Props = {
    selected: boolean;
    loading: boolean
}

const StarButton = ({selected, loading}: Props) => {
    useEffect(() => {
      const onScroll = () => console.log("window.scrollY =", window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer">
            {!loading ? (
                <>
                    <AiOutlineStar size={32}
                                   className="fill-white absolute -top-[2px] -right-[2px] opacity-80 transition cursor-pointer"/>
                    <AiFillStar size={27} className={selected ? "fill-yellow-200" : "fill-neutral-500/70"}/>
                </>
            ) : (
                <PiSpinnerGap size={32} className="fill-white animate-spin"/>
            )}
        </div>
    );
};

export default StarButton;