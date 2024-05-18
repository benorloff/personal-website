"use client"

import { useRef } from 'react';
import { allProjects, Project } from 'contentlayer/generated';
import { useScroll } from 'framer-motion';
import { ProjectCard } from '@/components/project-card';

export default function WorkPage () {

    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: scrollRef,
    });

    const projects = allProjects.sort();

    return (
        <div ref={scrollRef} className='h-full w-full overflow-scroll'>
            <div className='flex h-full w-full justify-center items-center text-8xl'>
                Work
            </div>
            <div className='p-10'>
                {projects.map((project: Project, i) => (
                    <ProjectCard 
                        key={i}
                        i={i}
                        project={project} 
                        projectsLength={projects.length}
                        progress={scrollYProgress}
                        scrollRef={scrollRef}
                    />
                ))}
            </div>
            <div className='flex h-full w-full justify-center items-center text-6xl'>
                Testimonials
            </div>
        </div>
    )
};