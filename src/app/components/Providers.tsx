'use client'

import {HeroUIProvider} from '@heroui/react'
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export function Providers({children}: {children: ReactNode} ) {
    return (
        <HeroUIProvider>
            <ToastContainer position="top-right" className="z-50 "/>
                {children}
        </HeroUIProvider>
    );
}