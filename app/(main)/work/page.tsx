"use client"

import { allProjects, Project } from 'contentlayer/generated';

import { Frame } from "@/components/frame";
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';

const WorkPage = () => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: scrollRef,
    });

    const translate = useSpring(scrollYProgress, {
        damping: 40,
        stiffness: 90,
        mass: 3,
    });

    const translateX = useTransform(translate, [0, 1], ['0%', '10%']);

    const projects = allProjects.sort();

    return (
        <>

            <div ref={scrollRef} className="relative grid grid-cols-1 h-full w-full overflow-scroll p-8 py-20 gap-20 ">             
                {projects.map((project: Project, i) => (
                    <Link key={i} href={`/work/${project._raw.flattenedPath.replace(/projects\/?/, '')}`}>
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
                            className='relative flex container py-8 items-end justify-between gap-4 group bg-foreground/5 backdrop-blur-sm overflow-hidden border custom-border-color backdrop-brightness-100 hover:backdrop-brightness-110 dark:hover:backdrop-brightness-125 rounded-sm transition-all duration-300 ease-in-out'
                        >
                            <div className='self-start'>
                                {`0${i+1}`}
                            </div>
                            <div className='absolute inset-x-0 h-full w-full -z-50'>
                                <motion.div
                                    initial={{ translateX: '-20%', opacity: 0.25 }}
                                    whileInView={{ translateX: '0%', opacity: 1 }}
                                    transition={{ 
                                        duration: 2, 
                                        type: 'spring', 
                                        damping: 40,
                                        stiffness: 90,
                                        mass: 3, 
                                    }}
                                    viewport={{ root: scrollRef, margin: "200px" }}
                                    className='absolute left-0 right-0 top-0 bottom-0 text-[300px] leading-none bg-gradient-to-t from-transparent from-20% to-primary/5 to-100% text-transparent bg-clip-text font-black'
                                >
                                    {project.title}
                                </motion.div>
                            </div>
                            <div className='flex-1 h-full space-y-4'>
                                <h2 className='text-6xl'>
                                    {project.title}
                                </h2>
                                <div className='flex gap-2'>
                                    {project.tags?.map((tag, i) => (
                                        <Badge key={i} variant='outline' className='p-2 px-4 text-muted-foreground'>{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className='flex-1'>
                                <Image src={project.heroImageUrl} alt="placeholder" width={400} height={200} />
                            </div>
                            <span className='self-end'>
                                {project.year}
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default WorkPage;