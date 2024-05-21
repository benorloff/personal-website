"use client"

import { allProjects, Project } from 'contentlayer/generated';
import { useRef } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { Mdx } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProjectCard } from '@/components/project-card';

const variants = {
    containerHidden: { scale: 0.9 },
    containerVisible: { scale: 1 },
    imageHidden: { opacity: 0.5 },
    imageVisible: { opacity: 1 },
}

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

    const projects: Project[] = allProjects.sort();

    const nextProject: Project = projects.indexOf(project) + 1 < projects.length 
        ? projects[projects.indexOf(project) + 1] 
        : projects[0]

    const nextProjectIndex: number = projects.indexOf(nextProject);

    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={contentRef} className="h-full w-full p-4 md:p-6 lg:p-10 overflow-scroll no-scrollbar">
            {/* <Mdx code={project.body.code} /> */}
            <div className='flex flex-col justify-center items-center gap-4 py-36'>
                <h4>PROJECT</h4>
                <h1 className='text-8xl font-normal text-center text-pretty tracking-tight'>{project.title}</h1>
                <div className='flex justify-center items-center gap-2'>
                    {project.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className='text-xs'>{tag}</Badge>
                    ))}
                </div>
            </div>
            <motion.div
                ref={useRef<HTMLDivElement>(null)}
                variants={variants}
                initial='containerHidden'
                whileInView='containerVisible'
                exit='containerHidden'
                viewport={{ root: contentRef, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className='mb-10 bg-background'
            >
                    <motion.div
                        ref={useRef<HTMLDivElement>(null)}
                        variants={variants}
                        initial='imageHidden'
                        whileInView='imageVisible'
                        exit='imageHidden'
                        transition={{ duration: 0.5 }}
                        viewport={{ root: contentRef, amount: 0.5 }}
                    >
                        <Image 
                            src={project.heroImageUrl} 
                            alt={project.title} 
                            width={1200} 
                            height={800} 
                            className='w-full rounded-sm border custom-border-color'
                        />
                    </motion.div>
            </motion.div>
            <div className='flex h-full flex-col gap-10 justify-center items-center'>
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
            {project.images?.map((image, index) => ( 
                <motion.div
                    key={index}
                    ref={useRef<HTMLDivElement>(null)}
                    variants={variants}
                    initial='containerHidden'
                    whileInView='containerVisible'
                    exit='containerHidden'
                    viewport={{ root: contentRef, amount: 0.5}}
                    transition={{ duration: 0.5 }}
                    className='mb-10 bg-background'
                >
                    <motion.div
                        ref={useRef<HTMLDivElement>(null)}
                        variants={variants}
                        initial='imageHidden'
                        whileInView='imageVisible'
                        exit='imageHidden'
                        transition={{ duration: 0.5 }}
                        viewport={{ root: contentRef, amount: 0.5 }}
                    >
                    <Image 
                        src={image.imageUrl} 
                        alt={image.alt || project.title} 
                        width={1200} 
                        height={800} 
                        className='w-full rounded-sm border custom-border-color'
                    />
                    </motion.div>
                </motion.div>
            ))}
            <div className='flex flex-col h-full w-full justify-center items-center gap-8'>
                <h4 className='text-4xl'>Up Next</h4>
                <ProjectCard 
                    project={nextProject} 
                    i={nextProjectIndex}
                />
            </div>
        </div>
    )
}

export default ProjectPage;