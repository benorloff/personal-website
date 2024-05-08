"use client"

import { allProjects, Project } from 'contentlayer/generated';

import { Frame } from "@/components/frame";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const WorkPage = () => {
    const projects = allProjects.sort();

    return (
        <>
            <Frame position="top">
                Work
            </Frame>
            <Frame position="left">
                <div />
            </Frame>
            <Frame position="right">
                <div />
            </Frame>
            <Frame position="bottom">
                <div />
            </Frame>
            <div className="relative grid grid-cols-1 h-full w-full overflow-scroll p-4 gap-4 ">             
                {projects.map((project: Project, i) => (
                    <Link key={i} href={`/work/${project._raw.flattenedPath.replace(/projects\/?/, '')}`}>
                        {/* <Image src="/placeholder.png" alt="placeholder" fill /> */}
                        <div className='relative flex container h-80 py-8 items-center justify-between gap-4 group bg-foreground/5 backdrop-blur-sm overflow-hidden border custom-border-color rounded-sm'>
                            <span className='self-start'>
                                {`0${i+1}`}
                            </span>
                            <span className='absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out -z-50 left-[-100px] top-[-250px] text-[500px] text-muted/30 font-black'>
                                {project.title}
                            </span>
                            <div className='flex-1 justify-self-start space-y-4'>
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
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default WorkPage;