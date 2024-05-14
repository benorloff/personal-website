"use client"

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence, stagger } from "framer-motion";
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
        <AnimatePresence mode="sync">
            { isModalOpen && (
            <div 
                className={cn(
                    "absolute z-10 top-0 left-0 w-full h-full overflow-scroll",
                    isModalOpen ? "block" : "hidden"
                )}
            >
                <div className="flex flex-row flex-wrap min-h-full lg:divide-x divide-foreground-muted dark:divide-foreground/25">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                        className="flex-1 min-w-full lg:min-w-0.5 modal-glass custom-border-color"
                    >
                        <h2 className="text-2xl font-semibold">Let's work together on your next project.</h2>
                    </motion.div>
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                        className="flex-1 flex flex-col min-w-full lg:min-w-0.5 justify-between modal-glass"
                    >
                        <h2 className="text-2xl font-semibold">Send me a message</h2>
                        <div className="flex border-t custom-border-color divide-x divide-muted-foreground/50">
                            {socials.map((social, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1, type: "tween", duration: 0.3 }}
                                    className="flex-1 flex justify-center aspect-square"
                                >
                                    <Button
                                        variant="ghost"
                                        className="h-full w-full rounded-none hover:bg-primary/10"
                                    >
                                        {social.icon}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            )}
        </AnimatePresence>
    )
}