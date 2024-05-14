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
        <div ref={contentRef} className="h-full w-full overflow-scroll snap-y snap-mandatory no-scrollbar">
            <div className='absolute top-0 right-0 h-full w-1 overflow-hidden'>
                <motion.div
                    className='absolute top-0 right-0 h-full w-1 bg-accent/50'
                    style={{ translateY }}
                />
            </div>
            {/* <Mdx code={project.body.code} /> */}
            <div className='flex h-full w-full justify-center items-center snap-center'>
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
            <div className='flex w-full h-full justify-center items-center snap-center'>
                <Image 
                    src={project.heroImageUrl} 
                    alt={project.title} 
                    width={800} 
                    height={400} 
                />
            </div>
            <div ref={constraintRef} className='flex flex-col w-full h-full gap-10 justify-center items-center snap-center p-4 md:p-6 lg:p-10'>
                <div 
                    className='text-2xl md:text-3xl lg:text-4xl'
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div className='flex flex-wrap w-full gap-x-24 gap-y-8'>
                    <div>
                        <p className='text-sm text-muted-foreground'>Client</p>
                        <p>{project.client}</p>
                    </div>
                    <div>
                        <p className='text-sm text-muted-foreground'>Year</p>
                        <p>{project.year}</p>
                    </div>
                    <div>
                        <p className='text-sm text-muted-foreground'>Services</p>
                        <p>Lorem ipsum dolor.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;