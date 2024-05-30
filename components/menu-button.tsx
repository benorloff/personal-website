"use client"

import { AlignRight, X } from "lucide-react"
import { Button } from "./ui/button"
import { useModal } from "@/hooks/use-modal-store"
import { motion, AnimatePresence } from "framer-motion";

export const MenuButton = () => {
    const { onOpen, onClose, isOpen, type } = useModal();
    const isModalOpen = isOpen && type === "menu";

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <div className="w-full h-full hover:bg-accent rounded-tr-sm group">
            { isModalOpen ? (
                <motion.div
                    layout
                    key="menu-open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full overflow-hidden"
                >
                    <Button 
                        variant="ghost"
                        className="h-full w-full rounded-none rounded-tr-sm p-1"
                        onClick={() => { !isModalOpen 
                            ? (onClose(), onOpen("menu")) 
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
                    key="menu-closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full overflow-hidden"
                >
                    <Button 
                        variant="ghost"
                        className="h-full w-full rounded-none rounded-tr-sm p-1"
                        onClick={() => { !isModalOpen 
                            ? (onClose(), onOpen("menu")) 
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
                            <AlignRight className="w-6 h-6 group-hover:scale-125 transition-transform duration-300 ease-in-out" />
                        </motion.div>
                    </Button>
                </motion.div>
            )}
            </div>
        </AnimatePresence>
    )
}