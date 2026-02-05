import Image from 'next/image';

type Aspect = 'square' | '4/3' | '3/4';

export type ResponsiveImageType = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspect?: Aspect;
};

const aspectMap: Record<Aspect, string> = {
  square: 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
};

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspect = '4/3',
}: ResponsiveImageType) {
  const aspectClass = aspectMap[aspect];

  return (
    <div className={`relative w-full max-w-sm ${aspectClass} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw,
               (max-width: 768px) 50vw,
               (max-width: 1200px) 33vw,
               25vw"
        className={`object-cover transition-opacity duration-300 ${imgClassName}`}
      />
    </div>
  );
}
