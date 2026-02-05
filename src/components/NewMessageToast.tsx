import React from 'react';
import { MessageDto } from '@/types';
import Link from 'next/link';
import { Image } from '@heroui/react';
import { transformImageUrl } from '@/lib/util';

type Props = {
  message: MessageDto;
};

export default function NewMessageToast({ message }: Props) {
  console.log(message);

  return (
    <Link href={`/members/${message.senderId}/chat`} className="flex items-center gap-2">
      <div className="mr-2">
        <Image
          src={transformImageUrl(message.senderImage) || '/images/user.png'}
          alt="sender image"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-grow flex-col justify-center">
        <div className="font-semibold">{message.senderName} sent you a message</div>
        <div className="text-sm">Click to view</div>
      </div>
    </Link>
  );
}

// export const newMessageToast = (message: MessageDto) => {
//     toast(<NewMessageToast message={message}/>);
// }
