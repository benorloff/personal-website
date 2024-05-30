"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button"
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  let mode: string = 'dark';
  let color: string = 'red';

  mode = theme?.split("-")[0]!;
  color = theme?.split("-")[1]!;

  useEffect(() => {
    if (theme) {
      mode = theme.split("-")[0];
      color = theme.split("-")[1];
    }
  }, [theme])

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <div className="w-full h-full hover:bg-accent rounded-bl-sm group">
      { mode === "light" ? (
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
            onClick={() => setTheme(`dark-${color}`)}
            className="h-full w-full rounded-none rounded-bl-sm p-1"
          >
            <motion.div 
                layout
                className="flex items-center"
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: -180 }}
            >
                <Sun className="w-6 h-6 group-hover:scale-125 transition-transform duration-300 ease-in-out" />
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
            onClick={() => setTheme(`light-${color}`)}
            className="h-full w-full rounded-none rounded-bl-sm p-1"
          >
            <motion.div 
                layout
                className="flex items-center"
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 180 }}
            >
                <Moon className="w-6 h-6 group-hover:scale-125 transition-transform duration-300 ease-in-out" />
                <span className="sr-only">Toggle theme</span>
            </motion.div>
          </Button>
        </motion.div>
      )}
      </div>
    </AnimatePresence>
  )
}