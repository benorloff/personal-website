"use client"

import { LucideBold } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const name = ["B", "E", "N", "O", "R", "L", "O", "F", "F"];

export const NameButton = () => {

    const router = useRouter();

    const [isGrid, setIsGrid] = useState<boolean>(false);

    return (
        <AnimatePresence>
            <Button 
                variant={isGrid ? "default" : "ghost"}
                className="h-full w-full rounded-none rounded-tl-sm p-1"
                onClick={() => router.push("/")}
                onMouseEnter={() => setIsGrid(true)}
                onMouseLeave={() => setIsGrid(false)}
            >
                {isGrid ? (
                    <div className="flex-1 w-full h-full grid grid-cols-3 grid-rows-3">
                        {name.map((char, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50, scale: 0.5 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 50, scale: 0.5 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex justify-center items-center text-xs leading-none"
                            >
                                    {char}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        layout
                        className="flex items-center"
                        initial={{ x: "calc(-100%)" }}
                        animate={{ x: 0 }}
                        exit={{ x: "calc(-100%)" }}
                    >
                        <LucideBold className="w-6 h-6" />
                    </motion.div>
                )}
            </Button>
        </AnimatePresence>
    )
}