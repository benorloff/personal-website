'use client'

import { useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap, motion, MotionValue, PanInfo, useDragControls, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftCircle, ChevronRightCircle, Circle, CircleDashed, CircleDot } from "lucide-react";

const testimonials = [
    {
        name: "John Doe",
        title: "CEO",
        company: "Google",
        imageUrl: "/ben.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        name: "Jane Doe",
        title: "CEO",
        company: "Facebook",
        imageUrl: "/ben.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        name: "John Smith",
        title: "CEO",
        company: "Amazon",
        imageUrl: "/ben.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
]

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? -500 : 500,
            opacity: 0,
        }
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction > 0 ? 500 : -500,
            opacity: 0,
        }
    }
}

const swipeConfidenceThreshold = 10000;
    
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

interface PaginateProps {
    onClick: () => void;
    type: "previous" | "next";
}

const Paginate = ({ 
    onClick,
    type,
}: PaginateProps) => (
    <div className="flex shrink justify-center items-center">
        <Button
            onClick={onClick}
            variant="ghost"
            size="icon"
            className="hover:bg-transparent"
        >
            {type === "previous"
                ? <ChevronLeftCircle size={24} />
                : <ChevronRightCircle size={24} />
            }
        </Button>
    </div>
);

export const TestimonialCarousel = () => {

    const [[current, direction], setCurrent] = useState<[number, number]>([0, 0]);

    const testimonialIndex = wrap(0, testimonials.length, current);

    const paginate = (newDirection: number) => {
        setCurrent([current + newDirection, newDirection]);
    }

    // let interval: NodeJS.Timeout | undefined = undefined;

    // const startInterval = () => {
    //     !interval && (interval = setInterval(() => paginate(1), 5000));
    // }

    // startInterval();

    // const resetInterval = () => {
    //     clearInterval(interval);
    //     interval = undefined;
    //     startInterval();
    // }
    
    return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-10">
            <div className="flex justify-center items-center gap-10">
                <Paginate type="previous" onClick={() => paginate(-1)} />
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ 
                            x: { type: "tween", ease: "easeInOut", duration: 0.5 },
                            opacity: { duration: 0.5 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="flex flex-col gap-8 border p-10 bg-background/25 rounded-sm custom-border-color min-w-[66%]"
                    >
                        <p>{testimonials[testimonialIndex].body}</p>
                        <p className="text-muted-foreground">
                            {testimonials[testimonialIndex].name}
                            {' // '}
                            {testimonials[testimonialIndex].title} at {testimonials[testimonialIndex].company}
                        </p>
                    </motion.div>
                </AnimatePresence>
                <Paginate type="next" onClick={() => paginate(1)} />
            </div>
            <div className="flex justify-center items-center gap-8">
                {testimonials.map((_, index) => (
                    <Avatar 
                        key={index}
                        className={cn(
                            "cursor-pointer transition-all duration-300 ease-in-out",
                            testimonialIndex === index ? "border custom-border-color scale-125" : "opacity-50"
                        )}
                        onClick={() => setCurrent([index, index - testimonialIndex])}
                    >
                        <AvatarImage src={testimonials[testimonialIndex].imageUrl} />
                        <AvatarFallback>
                            {testimonials[index].name[0]}
                        </AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
    )
}