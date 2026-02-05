import { UserFilters } from '@/types';
import { devtools } from 'zustand/middleware';
import { create } from 'zustand';

export type FilterState = {
  filters: UserFilters;
  setFilters: (
    filterName: keyof FilterState['filters'],
    value: string | number[] | string[] | boolean,
  ) => void;
  reset: (filters: UserFilters) => void;
};

const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      filters: {
        ageRange: [18, 100],
        gender: ['male', 'female'],
        orderBy: 'updated',
        withPhoto: false,
      },
      setFilters: (filterName, value) =>
        set((state) => {
          return {
            filters: { ...state.filters, [filterName]: value },
          };
        }),
    }),
    { name: 'FilterStore' },
  ),
);

export default useFilterStore;
