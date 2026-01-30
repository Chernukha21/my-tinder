"use client";

import {useState} from "react";
import {Button} from "@heroui/react";
import {Spinner} from "@heroui/spinner";
import {useFilters} from "@/store/useFilters";
import AppModal from "@/components/AppModal";
import FiltersContent from "./FiltersContent";

const Filters = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {isPending, totalCount} = useFilters();

    return (
        <>
            <div className="hidden md:block">
                <FiltersContent variant="desktop"/>
            </div>
            <div className="md:hidden shadow-md py-2 px-4 flex items-center justify-between">
                <div className="text-secondary font-semibold text-sm">
                    Results:{" "}
                    {isPending ? (
                        <Spinner size="sm" color="secondary"/>
                    ) : (
                        totalCount
                    )}
                </div>

                <Button
                    size="sm"
                    color="secondary"
                    variant="bordered"
                    onPress={() => setIsModalOpen(true)}
                >
                    Filters
                </Button>
            </div>

            <AppModal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                header="Filters"
                footerButtons={[
                    {
                        children: "Close",
                        variant: "solid",
                        color: "danger",
                        onPress: () => setIsModalOpen(false),
                    },
                ]}
                body={<FiltersContent variant="modal"/>}
            />
        </>
    );
};

export default Filters;
