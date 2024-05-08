"use client"

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const Cursor = () => {

    const position = {
        sm: {
            x: useMotionValue(0),
            y: useMotionValue(0),
        },
        md: {
            x: useMotionValue(0),
            y: useMotionValue(0),
        },
        lg: {
            x: useMotionValue(0),
            y: useMotionValue(0),
        },
    };

    const springConfig = {
        sm: {
            damping: 25,
            stiffness: 700,
            mass: 0.1,
        },
        md: {
            damping: 50,
            stiffness: 500,
            mass: 0.3,
        },
        lg: {
            damping: 75,
            stiffness: 300,
            mass: 0.5,
        },
    };

    const size = 10;

    const onMouseMove = (e: MouseEvent) => {
        position.sm.x.set(e.clientX-size/2);
        position.sm.y.set(e.clientY-size/2);
        position.md.x.set(e.clientX-size);
        position.md.y.set(e.clientY-size);
        position.lg.x.set(e.clientX-size*1.5);
        position.lg.y.set(e.clientY-size*1.5);
    };
    
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        }
    }, []);

    return (
        <>
        <motion.div 
                className="absolute rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
                style={{
                    translateX: useSpring(position.sm.x, springConfig.sm),
                    translateY: useSpring(position.sm.y, springConfig.sm),
                    width: size,
                    height: size,
                }}
            />
            <motion.div 
                className="absolute rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
                style={{
                    translateX: useSpring(position.md.x, springConfig.md),
                    translateY: useSpring(position.md.y, springConfig.md),
                    width: size*2,
                    height: size*2,
                }}
            />
            <motion.div 
                className="absolute rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
                style={{
                    translateX: useSpring(position.lg.x, springConfig.lg),
                    translateY: useSpring(position.lg.y, springConfig.lg),
                    width: size*3,
                    height: size*3,
                }}
            />
        </>
    )
}