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
        <AnimatePresence mode="sync">
            { isModalOpen && (
            <div 
                className={cn(
                    "absolute z-50 top-0 left-0 w-full h-full overflow-scroll",
                    isModalOpen ? "block" : "hidden"
                )}
            >
               <div className="flex flex-row flex-wrap-reverse min-h-full lg:divide-x divide-foreground-muted dark:divide-foreground/25">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                        className="flex-1 min-w-full lg:min-w-0.5 bg-background/75 modal-glass border-r custom-border-color"
                    >
                        <div className="p-10">
                            <h2 className="text-2xl font-semibold">Menu</h2>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                        className="flex-1 min-w-full lg:min-w-0.5 bg-background/75 modal-glass grid auto-cols-auto items-center divide-y divide-foreground-muted dark:divide-foreground/25"
                    >
                        {routes.map((route, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: '100%' }}
                                transition={{ delay: i * 0.1 }}
                                className="container h-full w-full flex items-center group hover:bg-primary/10 transition-all duration-500"
                                onClick={() => onClose()}
                            >
                                <Link key={i} href={route.href} className="h-full w-full flex items-center">
                                    <h2 className="text-6xl font-bold">{route.name}</h2>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            )}
        </AnimatePresence>
    )
}