'use client';

import { Button, Select, SelectItem, Slider, Switch } from '@heroui/react';
import { Spinner } from '@heroui/spinner';
import { useFilters } from '@/store/useFilters';

type FiltersContentProps = {
  variant: 'desktop' | 'modal';
};

const FiltersContent = ({ variant }: FiltersContentProps) => {
  const {
    orderByList,
    selectOrder,
    selectGender,
    genderList,
    selectAge,
    filters,
    isPending,
    totalCount,
    selectWithPhoto,
  } = useFilters();

  const resultsBlock = (
    <div
      className={
        variant === 'desktop'
          ? 'text-xl font-semibold text-secondary'
          : 'text-base font-semibold text-secondary'
      }
    >
      Results: {isPending ? <Spinner size="sm" color="secondary" /> : totalCount}
    </div>
  );

  const genderBlock = (
    <>
      <p className="text-sm font-medium text-gray-700">Gender</p>
      <div className="flex gap-2">
        {genderList.map(({ icon: Icon, value }) => (
          <Button
            key={value}
            size="sm"
            isIconOnly
            color={filters.gender.includes(value) ? 'secondary' : 'default'}
            onPress={() => selectGender(value)}
          >
            <Icon size={24} />
          </Button>
        ))}
      </div>
    </>
  );

  const ageBlock = (
    <>
      <Slider
        aria-label="Age range for selection"
        color="secondary"
        label="Age range"
        size="sm"
        minValue={18}
        maxValue={100}
        defaultValue={filters.ageRange}
        onChangeEnd={(value) => selectAge(value as number[])}
      />
    </>
  );

  const withPhotoBlock = (
    <>
      <p className="text-sm font-medium text-gray-700">With photo</p>
      <Switch
        color="secondary"
        size="sm"
        isSelected={filters.withPhoto}
        onChange={selectWithPhoto}
      />
    </>
  );

  const orderBlock = (
    <>
      <p className="text-sm font-medium text-gray-700">Order by</p>
      <Select
        size="sm"
        fullWidth
        variant="bordered"
        color="secondary"
        aria-label="Order by select"
        selectedKeys={new Set([filters.orderBy])}
        onSelectionChange={selectOrder}
      >
        {orderByList.map((item) => (
          <SelectItem key={item.value} textValue={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );

  if (variant === 'desktop') {
    return (
      <div className="py-2 shadow-md">
        <div className="flex flex-row items-center justify-around">
          <div className="flex items-center gap-2">{resultsBlock}</div>

          <div className="flex flex-col gap-1">{genderBlock}</div>

          <div className="flex w-1/4 flex-col gap-1">{ageBlock}</div>

          <div className="flex flex-col items-center gap-1">{withPhotoBlock}</div>

          <div className="flex w-1/4 flex-col gap-1">{orderBlock}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {resultsBlock}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">{genderBlock}</div>

        <div className="space-y-2 sm:col-span-2">{ageBlock}</div>

        <div className="space-y-2">{withPhotoBlock}</div>

        <div className="space-y-2">{orderBlock}</div>
      </div>
    </div>
  );
};

export default FiltersContent;
