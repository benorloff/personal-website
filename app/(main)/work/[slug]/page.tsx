"use client"

import { allProjects, Project } from 'contentlayer/generated';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Mdx } from '@/components/mdx-components';
import { Frame } from "@/components/frame";
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
    const { scrollYProgress } = useScroll({
        container: contentRef,
    });
    const translateY = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);

    return (
        <div ref={contentRef} className="h-full w-full overflow-scroll p-4 space-y-4 no-scrollbar">
            <div className='absolute top-0 -right-[2px] h-full w-[4px] overflow-hidden'>
                <motion.div
                    className='absolute top-0 bottom-0 origin-top w-full h-full rounded-full bg-gradient-to-b from-transparent from-80% to-red-500'
                    style={{ translateY }}
                />
            </div>
            {/* <Mdx code={project.body.code} /> */}
            <div className='flex h-full w-full justify-center items-center'>
                <div className='flex flex-col items-center gap-4'>
                    <h4>PROJECT</h4>
                    <h1>{project.title}</h1>
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
            <div className='flex w-full h-full justify-center items-center p-4'>
                <div className='container justify-center items-center card-glass bg-background/25 p-10 border rounded-sm'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
                    laborum.
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;