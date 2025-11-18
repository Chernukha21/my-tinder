"use client";
import {Photo} from "@prisma/client";
import {CldImage} from "next-cloudinary";
import {Image} from "@heroui/react";
import clsx from "clsx";
import {useRole} from "@/store/useRole";
import {Button} from "@heroui/button";
import {ImCheckmark, ImCross} from "react-icons/im";
import {approvePhoto, rejectPhoto} from "@/app/actions/adminActions";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

type Props = {
    photo: Photo | null;
}

const MemberImage = ({photo}: Props) => {
    const role = useRole();
    const router = useRouter();

    if (!photo) return null;

    async function approvePhotoHandler(photoId: string) {
        try {
            await approvePhoto(photoId);
            router.refresh();
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    async function rejectPhotoHandler(photo: Photo) {
        try {
            await rejectPhoto(photo);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        }
    }

    return (
        <div>
            {photo?.publicId ? (
                <CldImage
                    alt="Image of member"
                    src={photo.publicId}
                    width={300}
                    height={300}
                    crop="fill"
                    gravity="face"
                    className={clsx("rounded-2xl", {'opacity-40': !photo.isApproved && role !== 'ADMIN'})}
                    priority
                />
            ) : (
                <Image width={220} src={photo?.url || '/images/user.png'} alt='Image of user'/>
            )}
            {!photo?.isApproved && role !== 'ADMIN' && (
                <div className='absolute bottom-2 w-full bg-slate-200 p-1'>
                    <div className='flex justify-center text-danger font-semibold'>
                        Awaiting approval
                    </div>
                </div>
            )}
            {role === 'ADMIN' && (
                <div className='flex flex-row gap-2 mt-2'>
                    <Button onPress={() => approvePhotoHandler(photo.id)} color="success" variant="bordered" fullWidth>
                        <ImCheckmark size={20}/>
                    </Button>
                    <Button onPress={() => rejectPhotoHandler(photo)} color="danger" variant="bordered" fullWidth>
                        <ImCross size={20}/>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MemberImage;