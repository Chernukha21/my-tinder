"use client";
import {useRouter} from "next/navigation";
import {toggleLikeMember} from "@/app/actions/likeActons";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

type Props = {
    targetId: string;
    hasLiked: boolean;
}

const LikeButton = ({targetId, hasLiked}: Props ) => {
    const router = useRouter();

    async function toggleLike() {
        await toggleLikeMember(targetId, hasLiked);
        router.refresh();
    }

    return (
        <div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer ">
            <AiOutlineHeart className="fill-white absolute -top-[2px] -right-[2px]" size={28}/>
            <AiFillHeart className={hasLiked ? 'fill-red-500' : 'fill-neutral-500/70'} size={24}/>
        </div>
    );
};

export default LikeButton;