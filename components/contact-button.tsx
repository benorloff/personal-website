"use client"

import { MessageCircleMore, X } from "lucide-react"
import { Button } from "./ui/button"
import { useModal } from "@/hooks/use-modal-store"
import { motion, AnimatePresence } from "framer-motion";


export const ContactButton = () => {
    const { onOpen, onClose, isOpen, type } = useModal();
    const isModalOpen = isOpen && type === "contact";

    return (
        <AnimatePresence mode="popLayout">
            { isModalOpen ? (
                <motion.div
                    layout
                    key="contact-open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full overflow-hidden"
                >
                    <Button 
                        variant="default"
                        className="h-full w-full rounded-none p-1"
                        onClick={() => !isOpen ? onOpen("contact") : onClose()}
                    >
                        <motion.div 
                            layout
                            className="flex items-center"
                            initial={{ x: "calc(100%)", rotate: 180 }}
                            animate={{ x: 0, rotate: 0 }}
                            exit={{ x: "calc(100%)", rotate: 180 }}
                        >
                            <X className="w-6 h-6 lg:w-8 lg:h-8" />
                        </motion.div>
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    layout
                    key="contact-closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full overflow-hidden"
                >
                    <Button 
                        variant="ghost"
                        className="h-full w-full rounded-none p-1"
                        onClick={() => !isOpen ? onOpen("contact") : onClose()}
                    >
                        <motion.div 
                            layout
                            className="flex items-center"
                            initial={{ x: "calc(-100%)" }}
                            animate={{ x: 0 }}
                            exit={{ x: "calc(-100%)" }}
                        >
                            <MessageCircleMore className="w-6 h-6 lg:w-8 lg:h-8" />
                        </motion.div>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}