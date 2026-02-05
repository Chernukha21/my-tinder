'use client';

import { Pagination } from '@heroui/react';
import clsx from 'clsx';
import usePaginationStore from '@/store/usePaginationStore';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import { Button } from '@heroui/button';

export default function PaginationComponent({ totalCount }: { totalCount: number }) {
  const { pagination, setPagination, setPageSize, setPage } = usePaginationStore(
    useShallow((state) => ({
      pagination: state.pagination,
      setPagination: state.setPagination,
      setPageSize: state.setPageSize,
      setPage: state.setPage,
    })),
  );

  const { pageNumber, pageSize, totalPages } = pagination;

  useEffect(() => {
    setPagination(totalCount);
  }, [setPagination, totalCount]);

  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount); // без -1

  const isFirst = pageNumber === 1;
  const isLast = pageNumber === totalPages;

  const handlePrev = () => {
    if (!isFirst) setPage(pageNumber - 1);
  };

  const handleNext = () => {
    if (!isLast) setPage(pageNumber + 1);
  };

  return (
    <div className="mt-5 w-full border-t-2">
      <div className="flex flex-col items-center justify-between gap-2 py-5 md:flex-row">
        <div className="hidden text-sm text-default-500 sm:block">
          Showing {start}-{end} of {totalCount} results
        </div>

        <div className="flex items-center gap-4 sm:hidden">
          <Button
            color="secondary"
            onPress={handlePrev}
            disabled={isFirst}
            className="text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </Button>
          <span className="text-sm">
            {pageNumber}/{totalPages || 1}
          </span>
          <Button
            color="secondary"
            onPress={handleNext}
            disabled={isLast}
            className="text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:block">
          <Pagination
            total={totalPages}
            page={pageNumber}
            color="secondary"
            initialPage={1}
            variant="bordered"
            onChange={setPage}
          />
        </div>
        <div className="hidden flex-row items-center gap-1 md:flex">
          Page size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              onClick={() => setPageSize(size)}
              className={clsx('page-size-box', {
                'bg-secondary text-white hover:bg-secondary hover:text-white': pageSize === size,
              })}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
