'use client'

import { useState } from "react";
import { wrap, motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

const testimonials = [
    {
        name: "John Doe",
        title: "CEO",
        company: "Google",
        imageUrl: "/ben.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        name: "Jane Doe",
        title: "CEO",
        company: "Facebook",
        imageUrl: "/ben.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        name: "John Smith",
        title: "CEO",
        company: "Amazon",
        imageUrl: "/ben.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
]

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 500 : -500,
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
            x: direction > 0 ? -500 : 500,
            opacity: 0,
        }
    },
};

const swipeConfidenceThreshold = 10000;
    
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

interface PaginateProps {
    onClick: () => void;
    type: "previous" | "next";
};

const Paginate = ({ 
    onClick,
    type,
}: PaginateProps) => (
    <div className="hidden lg:flex shrink justify-center items-center lg:p-4">
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
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Since it possible for the value of the "current" state variable to be less than 0 or greater than 
    // the length of the testimonials array, we need to wrap the value of the "current" state variable
    // and convert it to a valid index in the testimonials array.
    const testimonialIndex = wrap(0, testimonials.length, current);

    const paginate = (newDirection: number) => {
        setCurrent([current + newDirection, newDirection]);
    }

    // let interval: NodeJS.Timeout;

    // const startInterval = () => {
    //     interval && clearInterval(interval);
    //     interval = setInterval(() => paginate(1), 5000);
    // }

    // useEffect(() => {
    //     interval = setInterval(() => paginate(1), 5000);
    //     return () => clearInterval(interval);
    // }, []);

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        const index = parseInt(e.currentTarget.getAttribute("data-id")!);
        let direction: number;
        if (index > testimonialIndex) {
            direction = 1;
        } else if (index < testimonialIndex) {
            direction = -1;
        } else {
            return;
        }
        setCurrent([index, direction]);
    }
    
    return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-10 p-4">
            <h2 className="text-4xl">
                Some{' '}
                <span className=" bg-gradient-to-tr from-accent to-accent-foreground text-transparent bg-clip-text">
                    kind words{' '}
                </span> 
                from{' '}
                <span className="bg-gradient-to-tr from-accent to-accent-foreground text-transparent bg-clip-text">
                    great people
                </span>
                {'.'}
            </h2>
            <div className="flex gap-10">
                <Paginate 
                    type="previous" 
                    onClick={() => paginate(-1)} 
                />
                <AnimatePresence 
                    mode="wait" 
                    initial={false} 
                    custom={direction}
                >
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
                        onDragStart={() => {setIsDragging(true)}}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                            setIsDragging(false);
                        }}
                        className={cn(
                            "flex flex-col gap-8 border p-10 bg-background/25 rounded-sm custom-border-color min-w-[66%]",
                            isDragging ? "cursor-grabbing" : "cursor-grab"
                        )}
                    >
                        <p>
                            {testimonials[testimonialIndex].body}
                        </p>
                        <p className="text-muted-foreground">
                            {testimonials[testimonialIndex].name}
                            {' // '}
                            {testimonials[testimonialIndex].title} at {testimonials[testimonialIndex].company}
                        </p>
                    </motion.div>
                </AnimatePresence>
                <Paginate 
                    type="next" 
                    onClick={() => paginate(1)} 
                />
            </div>
            <div className="flex justify-center items-center gap-8">
                {testimonials.map((_, index) => (
                    <Avatar 
                        key={index}
                        data-id={index}
                        className={cn(
                            "cursor-pointer transition-all duration-300 ease-in-out",
                            testimonialIndex === index 
                                ? "border custom-border-color scale-125" 
                                : "opacity-50 saturate-0"
                        )}
                        onClick={handleClick}
                    >
                        <AvatarImage src={testimonials[index].imageUrl} />
                        <AvatarFallback>
                            {testimonials[index].name[0]}
                        </AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
    )
}