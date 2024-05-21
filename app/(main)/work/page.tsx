"use client"

import { useRef } from 'react';
import { allProjects, Project } from 'contentlayer/generated';
import { useScroll } from 'framer-motion';
import { ProjectCard } from '@/components/project-card';
import { TestimonialCarousel } from '@/components/testimonial-carousel';

export default function WorkPage () {

    const projects = allProjects.sort();

    return (
        <div className='h-full w-full overflow-scroll'>
            <div className='flex h-full w-full justify-center items-center text-8xl'>
                Work
            </div>
            <div className='p-10'>
                {projects.map((project: Project, i) => (
                    <ProjectCard 
                        key={i}
                        i={i}
                        project={project} 
                    />
                ))}
            </div>
            <TestimonialCarousel />
        </div>
    )
};