"use client"

import { allProjects, Project } from 'contentlayer/generated';

import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const WorkPage = () => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(-1);

    const { scrollYProgress } = useScroll({
        container: scrollRef,
    });

    const translate = useSpring(scrollYProgress, {
        damping: 40,
        stiffness: 90,
        mass: 3,
    });

    const projects = allProjects.sort();

    return (
        <>

            <div ref={scrollRef} className="relative grid grid-cols-1 h-full w-full overflow-scroll p-4 py-20 gap-20 ">             
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
                                onHoverStart={() => setIsHovered(i)}
                                onHoverEnd={() => setIsHovered(-1)}
                                className='relative grid grid-cols-[auto,1fr,auto] grid-rows-2 p-8 gap-4 group bg-foreground/5 backdrop-blur-sm overflow-hidden border custom-border-color backdrop-brightness-100 hover:backdrop-brightness-110 dark:hover:backdrop-brightness-125 rounded-sm transition-all duration-300 ease-in-out'
                            >
                                <div className='self-start'>
                                    {`0${i+1}`}
                                </div>
                                <div className='absolute inset-x-0 h-full w-full -z-50'>
                                    <motion.div
                                        initial={{ translateX: '-30%' }}
                                        whileInView={{ translateX: '0%' }}
                                        transition={{
                                            duration: 3,
                                            type: 'spring',
                                            damping: 40,
                                            stiffness: 90,
                                            mass: 3,
                                        }}
                                        className='absolute left-0 right-0 top-0 bottom-0 text-[300px] leading-none bg-gradient-to-t from-transparent from-20% to-primary/5 to-100% text-transparent bg-clip-text font-black'
                                    >
                                        {project.title}
                                    </motion.div>
                                </div>
                                <div className='col-start-2 row-span-2 self-center justify-self-center'>
                                    <AnimatePresence>
                                        {isHovered === i && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.7 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.7 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Image 
                                                    src={project.heroImageUrl} 
                                                    alt="placeholder" 
                                                    width={400} 
                                                    height={200} 
                                                    className='rounded-sm'
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
                                            <Badge key={i} variant='outline' className='p-2 px-4 text-muted-foreground border-muted-foreground'>{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className='text-muted-foreground self-end justify-self-end'>
                                    {project.year}
                                </div>
                            </motion.div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default WorkPage;