"use client"

import { useRef } from 'react';
import { allProjects, Project } from 'contentlayer/generated';
import { useScroll } from 'framer-motion';
import { ProjectCard } from '@/components/project-card';
import { TestimonialCarousel } from '@/components/testimonial-carousel';

export default function WorkPage () {

    const projects = allProjects.sort();

    return (
        <>
            <div className='flex flex-col h-full w-full justify-center items-center'>
                <h1 className='text-xl text-muted-foreground font-normal uppercase'>Work</h1>
                <h1 className='text-8xl text-center text-pretty pb-10 '>
                    Recent projects.
                </h1>
                <p className='max-w-[500px] text-lg text-center text-pretty text-muted-foreground'>Over the last 10+ years, I've been fortunate to bring many digital experiences to life for great clients. This is a collection of some of my favorites.</p>
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
        </>
    )
};