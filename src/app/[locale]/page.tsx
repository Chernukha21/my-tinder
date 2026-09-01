import { auth } from '@/auth';
import { Button } from '@heroui/button';
import Link from 'next/link';
import LoversIcon from '@/components/svg/LoversIcon';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/request';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const session = await auth();
  const translation = await getTranslations({ locale, namespace: 'Nav' });

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 text-secondary">
      <LoversIcon className="h-48 w-48 fill-secondary" />

      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Welcome to next Match
      </h1>

      {session ? (
        <Button as={Link} href="/members" size="lg" color="secondary" variant="bordered">
          {translation('main page')}
        </Button>
      ) : (
        <div className="flex flex-row gap-4">
          <Button as={Link} href="/login" size="lg" color="secondary" variant="bordered">
            {translation('login')}
          </Button>

          <Button as={Link} href="/register" size="lg" color="secondary" variant="bordered">
            {translation('register')}
          </Button>
        </div>
      )}
    </div>
  );
}
