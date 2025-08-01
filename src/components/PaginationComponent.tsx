'use client';

import {Pagination} from '@heroui/react';
import clsx from "clsx";
import usePaginationStore from "@/store/usePaginationStore";
import {useShallow} from "zustand/shallow";
import {useEffect} from "react";

export default function PaginationComponent({totalCount}: { totalCount: number }) {
    const {pagination, setPagination, setPageSize, setPage} = usePaginationStore(useShallow(
        state => ({
            pagination: state.pagination,
            setPagination: state.setPagination,
            setPageSize: state.setPageSize,
            setPage: state.setPage,
        })
    ));

    const {pageNumber, pageSize, totalPages} = pagination;

    useEffect(() => {
        setPagination(totalCount)
    }, [setPagination, totalCount]);

    const start = (pageNumber - 1) * pageSize + 1;
    const end = Math.min(pageNumber * pageSize - 1, totalCount);

    return (
        <div className="border-t-2 w-full mt-5">
            <div className="flex flex-row justify-between items-center py-5">
                <div>Showing {start}-{end} of {totalCount} results</div>
                <Pagination
                    total={totalPages}
                    page={pageNumber}
                    color="secondary"
                    initialPage={1}
                    variant="bordered"
                    onChange={setPage}
                />
                <div className="flex flex-row gap-1 items-center">
                    Page size:
                    {[3, 6, 12].map(((size) => (
                        <div key={size} onClick={() => setPageSize(size)} className={clsx(
                            'page-size-box', {
                                'bg-secondary text-white hover:bg-secondary hover:text-white': pageSize === size
                            })}
                        >
                            {size}
                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
}
