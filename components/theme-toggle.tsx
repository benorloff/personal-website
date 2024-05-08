"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <AnimatePresence mode="popLayout">
      { theme === "light" ? (
        <motion.div
          layout
          key="theme-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full overflow-hidden"
        >
          <Button
            variant="ghost"
            onClick={() => setTheme("dark")}
            className="h-full w-full rounded-none rounded-bl-sm p-1"
          >
            <motion.div 
                layout
                className="flex items-center"
                initial={{ x: "calc(100%)", rotate: 180 }}
                animate={{ x: 0, rotate: 0 }}
                exit={{ x: "calc(100%)", rotate: 180 }}
            >
                <Sun className="w-6 h-6" />
                <span className="sr-only">Toggle theme</span>
            </motion.div>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          layout
          key="theme-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full overflow-hidden"
        >
          <Button
            variant="ghost"
            onClick={() => setTheme("light")}
            className="h-full w-full rounded-none rounded-bl-sm p-1"
          >
            <motion.div 
                layout
                className="flex items-center"
                initial={{ x: "calc(100%)", rotate: 180 }}
                animate={{ x: 0, rotate: 0 }}
                exit={{ x: "calc(100%)", rotate: 180 }}
            >
                <Moon className="w-6 h-6" />
                <span className="sr-only">Toggle theme</span>
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}