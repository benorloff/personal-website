"use client"

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CodeSquareIcon, Codepen, Github, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import { ContactForm } from "../contact-form";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faHashnode, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

interface Socials {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const socials: Socials[] = [
    { 
        name: "GitHub", 
        href: "https://github.com/benorloff/",
        icon: <FontAwesomeIcon icon={faGithub} size="2xl" />
    },
    { 
        name: "Hashnode", 
        href: "https://blog.benorloff.co/",
        icon: <FontAwesomeIcon icon={faHashnode} size="2xl" />
    },
    { 
        name: "LinkedIn", 
        href: "https://www.linkedin.com/in/benorloff/",
        icon: <FontAwesomeIcon icon={faLinkedin} size="2xl" />
    },
    { 
        name: "Instagram", 
        href: "https://www.instagram.com/ben.orloff/",
        icon: <FontAwesomeIcon icon={faInstagram} size="2xl" />
    },
]

export const ContactModal = () => {

    const { isOpen, type } = useModal();
    const isModalOpen = isOpen && type === "contact";

    return (
        <>
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
                        className="flex-1 min-w-full min-h-full lg:min-w-0.5 bg-background/75 modal-glass border-r custom-border-color"
                    >
                        <div className="flex flex-col h-full w-full justify-center items-center space-y-10 p-10">
                            {/* <ContactForm /> */}
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                        className="flex-1 flex flex-col min-h-full min-w-full lg:min-w-0.5 justify-between bg-background/75 modal-glass"
                    >
                        <div className="flex flex-col h-full w-full justify-between space-y-10 p-10">
                            <ContactForm />
                        </div>
                        <div className="flex min-h-24 border-t custom-border-color divide-x divide-muted-foreground/50">
                            {socials.map((social, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1, type: "tween", duration: 0.3 }}
                                    className="flex-1"
                                >
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <Link href={social.href} className="w-full h-full">
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full h-full rounded-none hover:bg-primary/10"
                                                    >
                                                        {social.icon}
                                                    </Button>
                                                </TooltipTrigger>
                                            </Link>
                                            <TooltipContent
                                                sideOffset={10}
                                                className="bg-primary/10 custom-border-color"
                                            >
                                                {social.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            )}
        </AnimatePresence>
        </>
    )
}