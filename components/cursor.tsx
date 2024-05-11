"use client"

import { RefObject, useEffect, useRef } from "react";
import { 
    MotionValue, 
    animate, 
    motion, 
    transform, 
    useMotionValue, 
    useSpring, 
    useTransform
} from "framer-motion";

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

    const cursor: {[key: string]: RefObject<HTMLDivElement>} = {
        xs: useRef<HTMLDivElement>(null),
        sm: useRef<HTMLDivElement>(null),
        md: useRef<HTMLDivElement>(null),
        lg: useRef<HTMLDivElement>(null),
    }

    const config: Config = {
        size: {
            xs: 5,
            sm: 10,
            md: 15,
            lg: 20,
        },
        scale: {
            xs: { x: useMotionValue(1), y: useMotionValue(1) },
            sm: { x: useMotionValue(1), y: useMotionValue(1) },
            md: { x: useMotionValue(1), y: useMotionValue(1) },
            lg: { x: useMotionValue(1), y: useMotionValue(1) },
        },
        springConfig: {
            xs: {
                damping: 20,
                stiffness: 750,
                mass: 0.2,
            },
            sm: {
                damping: 40,
                stiffness: 600,
                mass: 0.3,
            },
            md: {
                damping: 60,
                stiffness: 450,
                mass: 0.4,
            },
            lg: {
                damping: 80,
                stiffness: 300,
                mass: 0.5,
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

    // Set the distance of the cursors from the client X and Y coordinates
    // This must be done before setting the rotation, scale, and position
    const setDistance = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        Object.keys(distance).forEach((key) => {
            distance[key].x.set(
                clientX - position[key].x.get() - size[key] / 2
            );
            distance[key].y.set(
                clientY - position[key].y.get() - size[key] / 2
            );
        });
    }

    // Set the rotation of the cursors based on their
    // angle relative to the client X and Y coordinates
    const setRotate = () => {
        Object.keys(size).forEach((key) => {
            const angle = Math.atan2(
                distance[key].y.get(), 
                distance[key].x.get()
            );
            animate(
                cursor[key].current!, 
                { rotate: `${angle}rad` }, 
                { duration: 0, ease: 'easeInOut' }
            );
        });
    }

    // Set the scale of the width and height of the cursors
    // based on each cursor's distance from client X and Y coordinates
    // This creates the skew effect
    const setScale = () => {
        Object.keys(size).forEach((key) => {
            const absDistance = Math.max(
                Math.abs(distance[key].x.get()), 
                Math.abs(distance[key].y.get())
            );
            const newScaleX = transform(
                absDistance, 
                [0, size[key]], 
                [1, 1.5]
            );
            const newScaleY = transform(
                absDistance, 
                [0, size[key]], 
                [1, 0.5]
            );
            scale[key].x.set(newScaleX);
            scale[key].y.set(newScaleY);
        });
    }

    // Set the position of the cursors relative 
    // to the client X and Y coordinates
    const setPosition = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        Object.keys(position).forEach((key) => {
            position[key].x.set(clientX - size[key] / 2);
            position[key].y.set(clientY - size[key] / 2);
        });
    }

    const onMouseMove = (e: MouseEvent) => {
        setDistance(e);
        setRotate();
        setScale();
        setPosition(e);
    };

    // Prevent custom cursors from being stuck in skewed state
    // when the mouse leaves the viewport
    const onMouseLeave = (e: MouseEvent) => {
        Object.keys(size).forEach((key) => {
            scale[key].x.set(1);
            scale[key].y.set(1);
        });
    }

    interface TemplateProps {
        rotate: string;
        scaleX: number;
        scaleY: number;
        translateX: number;
        translateY: number;
    }

    // Define the order of the transformations
    // rotate must precede scale to avoid unexpected behavior
    const template = ({ 
        rotate, 
        scaleX, 
        scaleY, 
        translateX, 
        translateY,
     }: TemplateProps) => (
        `translateX(${translateX}) translateY(${translateY}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
    );
    
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseout", onMouseLeave);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseout", onMouseLeave);
        }
    }, []);

    return (
        <>
            {Object.keys(size).map((key) => (
                <motion.div 
                    key={key}
                    transformTemplate={template}
                    className="absolute max-w-10 max-h-10 rounded-full bg-background dark:bg-foreground mix-blend-difference pointer-events-none z-50"
                    style={{
                        translateX: useSpring(position[key].x, springConfig[key]),
                        translateY: useSpring(position[key].y, springConfig[key]),
                        width: size[key],
                        height: size[key],
                        scaleX: useSpring(scale[key].x, springConfig[key]),
                        scaleY: useSpring(scale[key].y, springConfig[key]),
                    }}
                    ref={cursor[key]}
                />
            ))}
        </>
    )
}