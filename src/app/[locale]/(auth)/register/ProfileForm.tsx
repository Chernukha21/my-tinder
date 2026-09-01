'use client';
import { useFormContext } from 'react-hook-form';
import { Select, Input, SelectItem, Textarea } from '@heroui/react';
import { format, subYears } from 'date-fns';
import { useTranslations } from 'next-intl';

const ProfileForm = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const translation = useTranslations('Register');
  const genderList = [
    { label: `${translation('male')}`, value: 'male' },
    { label: `${translation('female')}`, value: 'female' },
  ];
  return (
    <div className="space-y-4">
      <Select
        defaultSelectedKeys={getValues('gender')}
        label={translation('gender')}
        variant="bordered"
        aria-label="Select gender"
        {...register('gender')}
        isInvalid={!!errors.gender}
        errorMessage={errors.gender?.message as string}
        onChange={(e) => setValue('gender', e.target.value)}
      >
        {genderList.map((elem) => (
          <SelectItem key={elem.value}>{elem.label}</SelectItem>
        ))}
      </Select>
      <Input
        defaultValue={getValues('dateOfBirth')}
        label={translation('dateOfBirth')}
        max={format(subYears(new Date(), 18), 'yyyy-MM-dd')}
        variant="bordered"
        type="date"
        {...register('dateOfBirth')}
        isInvalid={!!errors.dateOfBirth}
        errorMessage={errors.dateOfBirth?.message as string}
      />
      <Textarea
        defaultValue={getValues('description')}
        label={translation('description')}
        variant="bordered"
        {...register('description')}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message as string}
      />
      <Input
        defaultValue={getValues('city')}
        label={translation('city')}
        variant="bordered"
        {...register('city')}
        isInvalid={!!errors.city}
        errorMessage={errors.city?.message as string}
      />
      <Input
        defaultValue={getValues('country')}
        label={translation('country')}
        variant="bordered"
        {...register('country')}
        isInvalid={!!errors.country}
        errorMessage={errors.country?.message as string}
      />
    </div>
  );
};

export default ProfileForm;
