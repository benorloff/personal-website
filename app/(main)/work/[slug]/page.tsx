"use client"

import { allProjects, Project } from 'contentlayer/generated';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div ref={contentRef} className="h-full w-full overflow-scroll p-4 space-y-4">
            {/* <Mdx code={project.body.code} /> */}
            <div className='flex h-full w-full justify-center items-center border border-white'>
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
            <div className='flex w-full h-full justify-center items-center border border-white'>
                <Image src={project.heroImageUrl} alt={project.title} width={800} height={400} />
            </div>
            <div className='flex w-full h-full justify-center items-center border border-white'>
                <div className='grid grid-cols-2 w-full h-full'>
                    <div className='flex justify-center items-center'>
                        {project.client}
                    </div>
                    <div className='flex justify-center items-center'>
                        {project.year}
                    </div>
                    <div className='flex justify-center items-center'>
                        {project.category[0] || 'category'}
                    </div>
                    <div className='flex justify-center items-center'>
                        one
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;