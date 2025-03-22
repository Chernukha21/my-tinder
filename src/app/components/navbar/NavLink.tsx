"use client";
import React from 'react';
import {NavbarItem} from "@heroui/navbar";
import Link from "next/link";
import {usePathname} from "next/navigation";

const NavLink = ({href, label}:{label:string, href:string}) => {
    const pathName = usePathname();
    return (
        <NavbarItem href={href} isActive={href.includes(pathName)} as={Link}>
            {label}
        </NavbarItem>
    );
};

export default NavLink;