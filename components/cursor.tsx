"use client"

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const Cursor = () => {

    const position = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const springConfig = {
        damping: 75,
        stiffness: 700,
        mass: 0.5,
    }

    const xSpring = useSpring(position.x, springConfig);
    const ySpring = useSpring(position.y, springConfig);

    const size = 10;

    const onMouseMove = (e: MouseEvent) => {
        position.x.set(e.clientX-(size/2));
        position.y.set(e.clientY-(size/2));
    };
    
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        }
    }, []);

    return (
       <motion.div 
            className="absolute rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
            style={{
                translateX: xSpring,
                translateY: ySpring,
                width: size,
                height: size,
            }}
        />
    )
}