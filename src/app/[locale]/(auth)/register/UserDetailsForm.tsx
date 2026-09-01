'use client';
import { Input } from '@heroui/input';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

const UserDetailsForm = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const translation = useTranslations('Register');
  return (
    <div className="space-y-4">
      <Input
        defaultValue={getValues('name')}
        label={translation('name')}
        variant="bordered"
        {...register('name')}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
      <Input
        defaultValue={getValues('email')}
        label={translation('email')}
        variant="bordered"
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        defaultValue={getValues('password')}
        label={translation('password')}
        variant="bordered"
        type="password"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
    </div>
  );
};

export default UserDetailsForm;
