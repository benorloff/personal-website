"use client"

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CodeSquareIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Socials {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const socials: Socials[] = [
    { 
        name: "icon", 
        href: "#",
        icon: <CodeSquareIcon />
    },
    { 
        name: "icon", 
        href: "#",
        icon: <CodeSquareIcon />
    },
    { 
        name: "icon", 
        href: "#",
        icon: <CodeSquareIcon />
    },
    { 
        name: "icon", 
        href: "#",
        icon: <CodeSquareIcon />
    },
    { 
        name: "icon", 
        href: "#",
        icon: <CodeSquareIcon />
    },
]

export const ContactModal = () => {

    const { isOpen, type } = useModal();
    const isModalOpen = isOpen && type === "contact";

    return (
        <AnimatePresence>
            { isModalOpen && (
            <motion.div 
                key="contact-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "absolute z-10 top-0 left-0 inset-y w-full h-full backdrop-blur-3xl overflow-scroll",
                    isModalOpen ? "block" : "hidden"
                )}
            >
                <div className="grid h-full grid-cols-10 grid-rows-10 items-center divide-x divide-y divide-muted-foreground/50 text-4xl">
                    <div 
                        className="container h-full w-full flex items-center col-span-5 row-span-2" 
                    >
                        Send me a message
                    </div>
                    {socials.map((social, i) => (
                        <motion.div 
                            key={i}
                            initial={{ y: "calc(100%)" }}
                            animate={{ y: 0 }}
                            exit={{ y: "calc(100%)" }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full w-full flex justify-center items-center col-span-2 row-start-9 row-span-2"
                        >
                            <Button
                                variant="ghost"
                                className="h-full w-full rounded-none p-1 hover:bg-primary/10"
                            >
                                {social.icon}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            )}
        </AnimatePresence>
    )
}