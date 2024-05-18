'use client';

import { Project } from "@/.contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectTitleProps {
    i: number;
    projectsLength?: number;
    progress?: MotionValue<number>;
    children: React.ReactNode;
}

interface ProjectCardProps {
    i: number;
    project: Project;
    projectsLength?: number;
    scrollRef?: React.RefObject<HTMLDivElement>;
    progress?: MotionValue<number>;
    className?: string;
}

const ProjectTitle = ({
    i,
    projectsLength,
    progress,
    children,
}: ProjectTitleProps) => {

    let start: number = 0;
    let end: number = 0;
    let range: number[] = [];
    let x: MotionValue<string> = useMotionValue('0%');

    if (projectsLength && progress) {
        start = i / projectsLength;
        end = start + ( 1 / projectsLength );
        range = [start, end];
        x = useTransform(progress, range, ['-10%', '0%']);
    }

    return (
        <motion.div
            key={i}
            style={{ x }}
            className='absolute left-0 right-0 top-0 bottom-0 text-[300px] leading-none bg-gradient-to-t from-transparent from-20% to-primary/5 to-100% text-transparent bg-clip-text font-black'
        >
            {children}
        </motion.div>
    )
}

export const ProjectCard = ({
    i,
    project,
    projectsLength,
    scrollRef,
    progress,
    className,
}: ProjectCardProps) => {

    const [isHovered, setIsHovered] = useState(-1);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, {
        damping: 40,
        stiffness: 90,
        mass: 3,
    });
    const ySpring = useSpring(y, {
        damping: 40,
        stiffness: 90,
        mass: 3,
    });

    const rotateX = useTransform(
        ySpring,
        [-0.5, 0.5],
        ["17.5deg", "-17.5deg"]
    );

    const rotateY = useTransform(
        xSpring,
        [-0.5, 0.5],
        ["-17.5deg", "17.5deg"]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    }
        


    return (
        <div 
            className={cn(
                "w-full pb-8",
                className,
            )}
            style={{
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/work/${project._raw.flattenedPath.replace(/projects\/?/, '')}`}>
                <motion.div 
                    initial={{ x: '-20%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ 
                        duration: 1, 
                        type: 'spring', 
                        damping: 40,
                        stiffness: 90,
                        mass: 3, 
                    }}
                    viewport={{ root: scrollRef, margin: "200px" }}
                    onHoverStart={() => setIsHovered(i)}
                    onHoverEnd={() => setIsHovered(-1)}
                    className='grid grid-cols-[auto,1fr,auto] grid-rows-2 p-8 gap-4 group bg-foreground/5 backdrop-blur-sm overflow-hidden border custom-border-color backdrop-brightness-100 hover:backdrop-brightness-110 dark:hover:backdrop-brightness-125 rounded-sm transition-all duration-300 ease-in-out'
                >
                    <div className='self-start'>
                        {`0${i+1}`}
                    </div>
                    <div className='absolute inset-x-0 h-full w-full -z-50'>
                        <ProjectTitle 
                            i={i} 
                            projectsLength={projectsLength}
                            progress={progress}
                        >
                            {project.title}
                        </ProjectTitle>
                    </div>
                    <div className='col-start-2 row-span-2 self-center justify-self-center'>
                        {/* <div className="w-full h-full rounded-sm bg-background/50"> */}
                            <motion.div
                                style={{
                                    rotateX,
                                    rotateY,
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <Image 
                                    src={project.heroImageUrl} 
                                    alt="placeholder" 
                                    width={400} 
                                    height={200} 
                                    className='rounded-sm shadow-xl shadow-background'
                                />
                            </motion.div>
                        {/* </div> */}
                    </div>
                    <div className='col-start-3 justify-self-end'>
                        <AnimatePresence>
                            {isHovered === i && (
                                <motion.div 
                                    initial={{ opacity: 0, translateX: '-20px', translateY: '20px' }}
                                    animate={{ opacity: 1, translateX: '0px', translateY: '0px' }}
                                    exit={{ opacity: 0, translateX: '-20px', translateY: '20px' }}
                                    transition={{ duration: 0.3 }}
                                    className='h-full ml-auto text-muted-foreground'
                                >
                                    <ArrowUpRight size={24} className='text-primary'/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className='space-y-4'>
                        <h2 className='text-6xl'>
                            {project.title}
                        </h2>
                        <div className='flex gap-2'>
                            {project.tags?.map((tag, i) => (
                                <Badge 
                                    key={i} 
                                    variant='outline' 
                                    className='p-2 px-4 text-muted-foreground border-muted-foreground'
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className='text-muted-foreground self-end justify-self-end'>
                        {project.year}
                    </div>
                </motion.div>
            </Link>
        </div>
    )
}