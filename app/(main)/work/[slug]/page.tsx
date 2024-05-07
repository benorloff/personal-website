"use client"

import { allProjects, Project } from 'contentlayer/generated';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mdx } from '@/components/mdx-components';
import { Frame } from "@/components/frame";

const ProjectPage = ({
    params
}: {
    params: {
        slug: string;
    }
}) => {

    const project = allProjects.find((project) => project._raw.flattenedPath.replace(/projects\/?/, '') === params.slug);

    if (!project) throw new Error("Project not found")

    const contentRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({
        container: contentRef,
    });
    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <Frame position="top">
                <div className="grid grid-cols-10 h-full w-full divide-x">
                    <div className="col-span-2 text-4xl flex justify-center items-center">
                        <h1>Work</h1>
                    </div>
                    <div className="col-span-8 text-4xl flex justify-center items-center">
                        <h1>{project.title}</h1>
                    </div>
                </div>
            </Frame>
            <Frame position="left">
                left
            </Frame>
            <Frame position="right">
                right
            </Frame>
            <Frame position="bottom">
                <motion.div
                    className="h-full w-full bg-muted-foreground origin-left"
                    style={{ scaleX }}
                />
            </Frame>
            <div ref={contentRef} className="h-full w-full overflow-scroll no-scrollbar">
                <Mdx code={project.body.code} />
            </div>
        </>
    )
}

export default ProjectPage;