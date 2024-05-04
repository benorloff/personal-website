"use client"

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const Cursor = () => {

    const position = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const springConfig = {
        damping: 75,
        stiffness: 800,
    }

    const xSpring = useSpring(position.x, springConfig);
    const ySpring = useSpring(position.y, springConfig);

    const size = 40;
    
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            position.x.set(e.clientX-(size/2));
            position.y.set(e.clientY-(size/2));
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
       <motion.div 
            className="absolute w-[40px] h-[40px] rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
            style={{
                translateX: xSpring,
                translateY: ySpring,
            }}
            
        />
    )
}