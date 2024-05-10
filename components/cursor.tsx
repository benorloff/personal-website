"use client"

import { set } from "date-fns";
import { MotionValue, motion, transform, useMotionValue, useSpring } from "framer-motion";
import { use, useEffect } from "react";
import { useWindowSize } from "usehooks-ts";

interface Config {
    size: {
        [key: string]: number;
    },
    scale: {
        [key: string]: {
            x: MotionValue<number>;
            y: MotionValue<number>;
        }
    },
    springConfig: {
        [key: string]: {
            damping: number;
            stiffness: number;
            mass: number;
        }
    },
    position: {
        [key: string]: {
            x: MotionValue<number>;
            y: MotionValue<number>;
        }
    },
    distance: {
        [key: string]: {
            x: MotionValue<number>;
            y: MotionValue<number>;
        }
    }
}

export const Cursor = () => {

    const config: Config = {
        size: {
            xs: 10,
            sm: 20,
            md: 30,
            lg: 40,
        },
        scale: {
            xs: { x: useMotionValue(1), y: useMotionValue(1) },
            sm: { x: useMotionValue(1), y: useMotionValue(1) },
            md: { x: useMotionValue(1), y: useMotionValue(1) },
            lg: { x: useMotionValue(1), y: useMotionValue(1) },
        },
        springConfig: {
            xs: {
                damping: 25,
                stiffness: 900,
                mass: 0.2,
            },
            sm: {
                damping: 50,
                stiffness: 700,
                mass: 0.4,
            },
            md: {
                damping: 75,
                stiffness: 500,
                mass: 0.6,
            },
            lg: {
                damping: 100,
                stiffness: 300,
                mass: 0.8,
            },
        },
        position: {
            xs: { x: useMotionValue(0), y: useMotionValue(0) },
            sm: { x: useMotionValue(0), y: useMotionValue(0) },
            md: { x: useMotionValue(0), y: useMotionValue(0) },
            lg: { x: useMotionValue(0), y: useMotionValue(0) },
        },
        distance: {
            xs: { x: useMotionValue(0), y: useMotionValue(0) },
            sm: { x: useMotionValue(0), y: useMotionValue(0) },
            md: { x: useMotionValue(0), y: useMotionValue(0) },
            lg: { x: useMotionValue(0), y: useMotionValue(0) },
        },
    };

    const { size, scale, springConfig, position, distance } = config;

    const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        Object.keys(distance).forEach((key) => {
            distance[key].x.set(clientX - position[key].x.get() - size[key] / 2);
            distance[key].y.set(clientY - position[key].y.get() - size[key] / 2);
        });
        Object.keys(scale).forEach((key) => {
            const absDistance = Math.max(Math.abs(distance[key].x.get()), Math.abs(distance[key].y.get()));
            const newScaleX = transform(absDistance, [0, size[key]], [1, 1.5]);
            const newScaleY = transform(absDistance, [0, size[key]], [1, 0.5]);
            scale[key].x.set(newScaleX);
            scale[key].y.set(newScaleY);
        });
        Object.keys(position).forEach((key) => {
            position[key].x.set(clientX - size[key] / 2);
            position[key].y.set(clientY - size[key] / 2);
        });
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
                    translateX: useSpring(position.xs.x, springConfig.xs),
                    translateY: useSpring(position.xs.y, springConfig.xs),
                    width: size.xs,
                    height: size.xs,
                    scaleX: scale.xs.x,
                    scaleY: scale.xs.y,
                }}
            />
            <motion.div 
                className="absolute rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
                style={{
                    translateX: useSpring(position.sm.x, springConfig.sm),
                    translateY: useSpring(position.sm.y, springConfig.sm),
                    width: size.sm,
                    height: size.sm,
                    scaleX: scale.sm.x,
                    scaleY: scale.sm.y,
                }}
            />
            <motion.div 
                className="absolute rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
                style={{
                    translateX: useSpring(position.md.x, springConfig.md),
                    translateY: useSpring(position.md.y, springConfig.md),
                    width: size.md,
                    height: size.md,
                    scaleX: scale.md.x,
                    scaleY: scale.md.y,
                }}
            />
            <motion.div 
                className="absolute rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
                style={{
                    translateX: useSpring(position.lg.x, springConfig.lg),
                    translateY: useSpring(position.lg.y, springConfig.lg),
                    width: size.lg,
                    height: size.lg,
                    scaleX: scale.lg.x,
                    scaleY: scale.lg.y,
                }}
            />
        </>
    )
}