"use client"

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence, stagger } from "framer-motion";
import { CodeSquareIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
                    "absolute z-50 top-0 left-0 w-full h-full overflow-scroll",
                    isModalOpen ? "block" : "hidden"
                )}
            >
                <div className="flex flex-row flex-wrap min-h-full lg:divide-x divide-foreground-muted dark:divide-foreground/25">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                        className="flex-1 min-w-full min-h-full lg:min-w-0.5 bg-background/25 modal-glass"
                    >
                        <div className="flex flex-col h-full w-full justify-center items-center space-y-10 p-10">
                            <h2 className="text-2xl font-semibold">Let's work together on your next project.</h2>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                        className="flex-1 flex flex-col min-h-full min-w-full lg:min-w-0.5 justify-between bg-background/25 modal-glass"
                    >
                        <div className="flex flex-col h-full w-full justify-between space-y-10 p-10">
                            <h2 className="text-2xl font-semibold">Send me a message</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Name*"
                                        className="flex-1 h-12 bg-background/25 border-muted-foreground/50"
                                        required
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email*"
                                        className="flex-1 h-12 bg-background/25 border-muted-foreground/50"
                                        required
                                    />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Company"
                                    className="w-full h-12 bg-background/25 border-muted-foreground/50"
                                />
                                <Textarea
                                    placeholder="Message*"
                                    className="w-full bg-background/25 border-muted-foreground/50"
                                    rows={10}
                                    required
                                />
                                <Button
                                    className="w-full h-12"
                                >
                                    Send
                                </Button>
                            </div>
                            <div className="flex min-h-min w-full justify-center items-end">
                                <p>Or find me here 👇🏼</p>
                            </div>
                        </div>
                        <div className="flex border-t custom-border-color divide-x divide-muted-foreground/50">
                            {socials.map((social, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1, type: "tween", duration: 0.3 }}
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