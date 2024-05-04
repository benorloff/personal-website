"use client"

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const routes = [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" }
];

export const MenuModal = () => {

    const { onOpen, isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "menu";

    return (
        <AnimatePresence>
            { isModalOpen && (
            <motion.div 
                key="menu-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "linear", duration: 0.5 }}
                className={cn(
                    "absolute z-10 top-0 left-0 inset-y w-full h-full bg-background overflow-scroll",
                    isModalOpen ? "block" : "hidden"
                )}
            >
                <div className="flex flex-row h-full divide-x divide-foreground-muted dark:divide-background-muted">
                    <div className="flex-1 container py-8">
                        <h2 className="text-2xl font-semibold">Menu</h2>
                    </div>
                    <div className="flex-1 grid auto-cols-auto h-full items-center divide-y divide-foreground-muted dark:divide-background-muted">
                        {routes.map((route, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 50, scale: 0.5 }}
                                transition={{ delay: i * 0.1 }}
                                className="container h-full w-full flex items-center group hover:bg-foreground transition-colors duration-500"
                                onClick={() => onClose()}
                            >
                                <Link key={i} href={route.href} className="h-full w-full flex items-center">
                                    <h2 className="text-8xl font-bold group-hover:text-background ">{route.name}</h2>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
    )
}