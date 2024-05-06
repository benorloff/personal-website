import { Project, Media } from "@/payload-types";
import configPromise from '@payload-config'
import Image from "next/image";
import { getPayload } from 'payload'

import { motion, useScroll, useSpring } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useRef } from "react";
import { Frame } from "@/components/frame";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

const ProjectPage = async ({
    params
}: {
    params: {
        slug: string;
    }
}) => {

    // const contentRef = useRef(null);
    // const { scrollYProgress } = useScroll({
    //     container: contentRef,
    // });
    // const scaleY = useSpring(scrollYProgress, {
    //     stiffness: 100,
    //     damping: 30,
    //     restDelta: 0.001,
    // })

    const payload = await getPayload({ config: configPromise });
    let project: Project | null = null;
    let featuredImage: Media | null = null;

    try {
        project = await payload.db.collections.projects.findOne({
            slug: params.slug,
        });
        // featuredImage = await payload.db.collections.media.findOne({
        //     id: project?.featuredImage,
        // });
    } catch (error) {
        console.error(error);
    }

    return (
        <div>
            <Frame position="top">
                <div className="grid grid-cols-10 h-full divide-x justify-items-start place-items-center">
                    <div className="col-span-2 flex justify-center items-center h-full w-full">
                        <h1 className="text-2xl font-semibold">Work</h1>
                    </div>
                    <div className="col-span-8 flex justify-center items-center h-full w-full">
                    <h2 className="text-2xl font-semibold">{project?.title}</h2>
                    </div>
                </div>
            </Frame>
            <Frame position="left">
                <div className="grid auto-rows-auto h-full divide-y justify-items-start place-items-center">
                    <div className="flex justify-center items-center h-full w-full">
                        <ChevronLeft />
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                        <ChevronRight />
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                        <List />
                    </div>
                </div>
            </Frame>
            <Frame position="center">
                <div className="absolute z-10 h-full w-full">
                    <div className="h-full overflow-y-scroll snap-y snap-mandatory">
                        <div className="h-full w-full flex justify-center items-center snap-center">
                            <h1 className="text-4xl font-semibold">Summary</h1>
                            
                        </div>
                        <div className="h-full w-full flex justify-center items-center snap-center">
                            <h1 className="text-4xl font-semibold">Center</h1>
                        </div>
                        <div className="h-full w-full flex justify-center items-center snap-center">
                            <h1 className="text-4xl font-semibold">Center</h1>
                        </div>
                    </div>
                </div>
            </Frame>
            <Frame position="right">
                {/* <motion.div 
                    className="h-full w-full bg-foreground origin-top" 
                    style={{ scaleY }}
                /> */}
                right
            </Frame>
            <Frame position="bottom">
                bottom
            </Frame>
        </div>
    )
}

export default ProjectPage;