"use client";
import {usePathname} from "next/navigation";
import Filters from "@/components/navbar/Filters";

const FiltersWrapper = () => {
    const pathName = usePathname();
    if (pathName === '/members') return <Filters/>;
    else return null;
};

export default FiltersWrapper;