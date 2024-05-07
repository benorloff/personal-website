"use client"

import { allProjects, Project } from 'contentlayer/generated';

import { Frame } from "@/components/frame";
import Link from 'next/link';
import { motion } from 'framer-motion';

const WorkPage = () => {
    const projects = allProjects.sort();

    return (
        <>
            <Frame position="top">
                Work
            </Frame>
            <Frame position="left">
                left
            </Frame>
            <Frame position="right">
                right
            </Frame>
            <Frame position="bottom">
                bottom
            </Frame>
            <div className="flex flex-col h-full w-full overflow-scroll divide-y">                
                {projects.map((project: Project, i) => (
                    <Link key={i} href={`/work/${project._raw.flattenedPath.replace(/projects\/?/, '')}`}>
                        <div 
                            key={i} 
                            className="flex container py-8 h-48 justify-between items-center"
                        >
                            <h2 className='text-4xl'>{project.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default WorkPage;