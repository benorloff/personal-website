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
                left
            </Frame>
            <Frame position="right">
                right
            </Frame>
            <Frame position="bottom">
                bottom
            </Frame>
            <div className="relative grid grid-cols-1 h-full w-full overflow-scroll divide-y ">             
                {projects.map((project: Project, i) => (
                    <Link key={i} href={`/work/${project._raw.flattenedPath.replace(/projects\/?/, '')}`}>
                        {/* <Image src="/placeholder.png" alt="placeholder" fill /> */}
                        <div className='relative flex container h-80 py-8 items-center justify-between gap-4 backdrop-blur-xl bg-background/25 overflow-hidden'>
                            <span className='self-start'>{`0${i+1}`}</span>
                            <span className='absolute -z-50 left-[-100px] top-[-250px] text-[500px] text-muted/20 font-black'>{project.title}</span>
                            <div className='flex-1 justify-self-start space-y-4'>
                                <h2 className='text-6xl'>{project.title}</h2>
                                <div className='flex gap-2'>
                                    <Badge variant='outline' className='p-2 px-4 text-muted-foreground'>Next.js</Badge>
                                    <Badge variant='outline' className='p-2 px-4 text-muted-foreground'>Prisma</Badge>
                                    <Badge variant='outline' className='p-2 px-4 text-muted-foreground'>TailwindCSS</Badge>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <Image src="/placeholder.png" alt="placeholder" width={400} height={200} />
                            </div>
                            <span className='self-end'>2024</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default WorkPage;