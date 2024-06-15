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

    const project: Project | undefined = allProjects.find((project) => project._raw.flattenedPath.replace(/projects\/?/, '') === params.slug);
    
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
        <div ref={contentRef} className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-scroll no-scrollbar">
            <div className='flex flex-col justify-center items-center gap-4 py-36'>
                <h4>PROJECT</h4>
                <h1 className='text-center text-pretty tracking-tight'>{project.title}</h1>
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
                            src={project.featuredImage} 
                            alt={project.title} 
                            width={1200} 
                            height={800} 
                            className='w-full rounded-sm border custom-border-color'
                        />
                    </motion.div>
            </motion.div>
            <div className='flex flex-col lg:flex-row min-h-screen gap-16 justify-center items-center py-10'>
                <div className='my-auto space-y-4'>
                    <p className='text-sm text-muted-foreground uppercase'>Summary</p>
                    <Mdx code={project.body.code} />
                </div>
                <div className='flex flex-col w-full gap-x-24 gap-y-8 my-auto'>
                    <div>
                        <p className='text-sm text-muted-foreground uppercase'>Client</p>
                        <p>{project.client}</p>
                    </div>
                    <div>
                        <p className='text-sm text-muted-foreground uppercase'>Year</p>
                        <p>{project.year}</p>
                    </div>
                    <div>
                        <p className='text-sm text-muted-foreground uppercase'>Services</p>
                        <div className='flex flex-wrap gap-2 py-2'>
                            { project.services && Array.from(project.services).map((service, index) => (
                                <Badge 
                                    key={index} 
                                    variant='outline' 
                                    className='text-base font-normal w-fit rounded-sm'
                                >
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className='text-sm text-muted-foreground uppercase'>Technologies</p>
                        <div className='flex flex-wrap items-center gap-2 py-2'>
                            {project.tech && Array.from(project.tech).map((t, index) => (
                                <Badge 
                                    key={index} 
                                    variant='outline' 
                                    className='text-base font-normal w-fit rounded-sm'
                                >
                                    {t}
                                </Badge>
                            ))}
                        </div>
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