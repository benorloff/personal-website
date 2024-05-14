"use client"

import { allProjects, Project } from 'contentlayer/generated';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Mdx } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import Image from 'next/image';

const ProjectPage = ({
    params
}: {
    params: {
        slug: string;
    }
}) => {

    const project = allProjects.find((project) => project._raw.flattenedPath.replace(/projects\/?/, '') === params.slug);

    if (!project) {
        return notFound();
    }

    const contentRef = useRef<HTMLDivElement>(null);
    const constraintRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: contentRef,
    });
    const translateY = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);

    return (
        <div ref={contentRef} className="container h-full w-full overflow-scroll space-y-4 no-scrollbar">
            <div className='absolute top-0 right-0 h-full w-1 overflow-hidden'>
                <motion.div
                    className='absolute top-0 right-0 h-full w-1 bg-accent'
                    style={{ translateY }}
                />
            </div>
            {/* <Mdx code={project.body.code} /> */}
            <div className='flex h-full w-full justify-center items-center'>
                <div className='flex flex-col items-center gap-4'>
                    <h4>PROJECT</h4>
                    <h1 className='text-8xl'>{project.title}</h1>
                    <div className='flex justify-center items-center gap-2'>
                        {project.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className='text-xs'>{tag}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex w-full h-full justify-center items-center'>
                <Image src={project.heroImageUrl} alt={project.title} width={800} height={400} />
            </div>
            <div ref={constraintRef} className='flex flex-col w-full h-full gap-4 justify-center items-center'>
                <motion.div 
                    drag 
                    dragConstraints={constraintRef}
                    className='container justify-center items-center card-glass bg-background/25 p-10 border rounded-sm'
                >
                    <h3>Brief</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
                    laborum.
                </motion.div>
                <div className='flex gap-4'>
                    <motion.div 
                        drag 
                        dragConstraints={constraintRef}
                        className='container justify-center items-center card-glass bg-background/25 p-10 border rounded-sm'
                    >
                        <h3>Client</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </motion.div>
                    <motion.div 
                        drag 
                        dragConstraints={constraintRef}
                        className='container justify-center items-center card-glass bg-background/25 p-10 border rounded-sm'
                    >
                        <h3>Client</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;