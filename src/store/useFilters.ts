'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Selection } from '@heroui/react';
import { FaFemale, FaMale } from 'react-icons/fa';
import useFilterStore from '@/store/useFilterStore';
import { ChangeEvent, useEffect, useTransition } from 'react';
import usePaginationStore from '@/store/usePaginationStore';
import { useShallow } from 'zustand/shallow';

export const useFilters = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { filters, setFilters } = useFilterStore();
  const [isPending, startTransition] = useTransition();

  const { pageNumber, pageSize, setPage, totalCount } = usePaginationStore(
    useShallow((state) => ({
      pageNumber: state.pagination.pageNumber,
      pageSize: state.pagination.pageSize,
      setPage: state.setPage,
      totalCount: state.pagination.totalCount,
    })),
  );

  const { gender, ageRange, orderBy } = filters;

  useEffect(() => {
    if (gender || ageRange || orderBy) {
      setPage(1);
    }
  }, [ageRange, gender, orderBy, setPage]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (gender) searchParams.set('gender', gender.join(','));
      if (ageRange) searchParams.set('ageRange', ageRange.toString());
      if (orderBy) searchParams.set('orderBy', orderBy);
      if (pageSize) searchParams.set('pageSize', pageSize.toString());
      if (pageNumber) searchParams.set('pageNumber', pageNumber.toString());
      router.replace(`${pathName}?${searchParams}`);
    });
  }, [ageRange, gender, orderBy, pathName, router, setFilters, pageSize, pageNumber]);

  const handleAgeSelect = (age: number[]) => {
    setFilters('ageRange', age);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      const isValue = value.values().next().value;
      if (isValue !== undefined) {
        setFilters('orderBy', isValue.toString());
      }
    }
  };

  const handleByGenderSelect = (value: string) => {
    if (gender.includes(value))
      setFilters(
        'gender',
        gender.filter((gender) => gender !== value),
      );
    else setFilters('gender', [...gender, value]);
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters('withPhoto', e.target.checked);
  };

  const genderList = [
    { value: 'male', icon: FaMale },
    { value: 'female', icon: FaFemale },
  ];

  const orderByList = [
    { label: 'Last active', value: 'updated' },
    { label: 'Newest members', value: 'created' },
  ];

  return {
    orderByList,
    selectOrder: handleOrderSelect,
    selectGender: handleByGenderSelect,
    genderList,
    selectAge: handleAgeSelect,
    filters,
    isPending,
    totalCount,
    selectWithPhoto: handleWithPhotoToggle,
  };
};
