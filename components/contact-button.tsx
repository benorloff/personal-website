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
            <div className="w-full h-full hover:bg-accent rounded-br-sm group">
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
                        variant="ghost"
                        className="h-full w-full rounded-none rounded-br-sm p-1"
                        onClick={() => { !isModalOpen 
                            ? (onClose(), onOpen("contact")) 
                            : onClose()
                        }}
                    >
                        <motion.div 
                            layout
                            className="flex items-center"
                            initial={{ rotate: -180 }}
                            animate={{ rotate: 0 }}
                            exit={{ rotate: -180 }}
                        >
                            <X className="w-6 h-6 group-hover:scale-125 transition-transform duration-300 ease-in-out" />
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
                        className="h-full w-full rounded-none rounded-br-sm p-1"
                        onClick={() => { !isModalOpen 
                            ? (onClose(), onOpen("contact")) 
                            : onClose()
                        }}
                    >
                        <motion.div 
                            layout
                            className="flex items-center"
                            initial={{ rotate: 180 }}
                            animate={{ rotate: 0 }}
                            exit={{ rotate: 180 }}
                        >
                            <MessageCircleMore className="w-6 h-6 group-hover:scale-125 transition-transform duration-300 ease-in-out" />
                        </motion.div>
                    </Button>
                </motion.div>
            )}
            </div>
        </AnimatePresence>
    )
}