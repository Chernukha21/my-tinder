'use client';
import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInUser } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import SocialLogin from '@/app/[locale]/(auth)/login/SocialLogin';
import { useTranslations } from 'next-intl';

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const translation = useTranslations('Login');

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === 'success') {
      router.push('/');
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-sm px-4 sm:max-w-md sm:px-6">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">{translation('login')}</h1>
          </div>
          <p className="text-neutral-500"> {translation('welcome_again')}</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label={translation('email_placeholder')}
              variant="bordered"
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=""
              label={translation('password_placeholder')}
              variant="bordered"
              type="password"
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <div className="flex flex-col items-center gap-2">
              <Button
                isLoading={isSubmitting}
                disabled={!isValid}
                fullWidth
                color="secondary"
                type="submit"
              >
                {translation('submit')}
              </Button>
              <SocialLogin />
            </div>
            <div className="flex cursor-pointer justify-center text-sm hover:underline">
              <Link href="/forgot-password">{translation('forgot_password_link')}</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default LoginForm;
