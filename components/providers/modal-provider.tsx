"use client";

import { useEffect, useState } from "react";

import { ContactModal } from "@/components/modals/contact-modal";
import { MenuModal } from "@/components/modals/menu-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <MenuModal />
            <ContactModal />
        </>
    )
}