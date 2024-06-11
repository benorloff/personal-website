"use client";

import { githubEventTypes } from "@/lib/github";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { MotionValue, PanInfo, motion, useSpring, useTransform } from "framer-motion";
import { ActivityIcon, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRafLoop } from "react-use";
import { useWindowSize } from "usehooks-ts";

const config = {
    speed: 0.50,
    threshold: 0.014,
    wheelFactor: 1.8,
    dragFactor: 1.2,
}

const Content = ({events}: any) => {
    return (
        <div className="flex h-full w-full p-1">
            {events.map((event: any, i: number) => {
                const { outputText } = githubEventTypes.find(
                    (e) => e.event === event.type) 
                    || { outputText: '', icon: undefined };
                return (
                    <div
                        key={event.id}
                        className="flex-1 text-sm font-normal flex h-full min-w-max justify-center items-center gap-2 px-3 text-nowrap"
                    >
                        {/* <img
                            src={event.actor.avatar_url}
                            alt={event.actor.display_login}
                            width={24}
                            height={24}
                            className="rounded-full"
                        /> */}
                        <div className="flex gap-1">
                            <Github size={16}/>
                            <ActivityIcon />
                        </div>
                        <div>
                            {event.actor.display_login}
                            {' '}
                            {outputText}
                            {' '}
                            {event.repo.name}
                            {' '}
                            {formatDistance(
                                new Date(event.created_at), 
                                new Date(), 
                                { addSuffix: true }
                            )}
                        </div>
                    </div>
            )})}
        </div>
    );
};

const ActivityBlock = ({ 
    events, 
    speed,
}: {
    events: any,
    speed: MotionValue<number>,
}) => {
    const block = useRef<HTMLDivElement>(null);
    const blockRect = useRef<DOMRect>(null);
    const x = useRef<number>(0);

    const { width = 0, height= 0 } = useWindowSize();

    const setX = () => {
        if (!block.current || !blockRect.current) return;
        const xPercentage = (x.current / blockRect.current?.width!) * 100;
        if (xPercentage < -100) x.current = 0;
        if (xPercentage > 0) x.current = -blockRect.current?.width!;
        block.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
    }

    useEffect(() => {
        //@ts-ignore
        blockRect.current = block.current.getBoundingClientRect();
    }, [width, height]);

    const loop = () => {
        x.current -= speed.get();
        setX();
    };

    useRafLoop(loop, true);

    return (
        <div ref={block} className="flex h-full pointer-events-none cursor-none">
            <Content events={events}/>
        </div>
    )
};

const Marquee = ({events}: any) => {
    const marquee = useRef<HTMLDivElement>(null);
    const slowDown = useRef<boolean>(false);
    // const isScrolling = useRef(false);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const x = useRef<number>(0);
    const w = useRef(useWindowSize().width).current;
    const speed = useSpring(config.speed, {
        damping: 40,
        stiffness: 90,
        mass: 5,
    });
    const opacity = useTransform(speed, [-w * 1.25, 1, w * 1.25], [0, 1, 0]);
    const skewX = useTransform(speed, [-w * 0.25, 0, w * 0.25], [-25, 0, 25]);

    const onDragStart = () => {
        setIsDragging(true);
        slowDown.current = true;
        marquee.current?.classList.add("drag");
        speed.set(0);
      };
    
    const onDrag = (
        e: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
    ) => {
        speed.set(config.dragFactor * -info.delta.x);
    };
    
    const onDragEnd = (
        e: MouseEvent | TouchEvent | PointerEvent,
    ) => {
        setIsDragging(false);
        slowDown.current = false;
        marquee.current?.classList.remove("drag");
        x.current = config.speed;
    };

    const loop = () => {
        if (slowDown.current || Math.abs(x.current) < 0.014) return;
        x.current *= 0.66;
        if (x.current < 0) {
            x.current = Math.min(x.current, 0);
        } else {
            x.current = Math.max(x.current, 0);
        }
        speed.set(0.5 + x.current);
    };

    useRafLoop(loop, true);

    return (
        <motion.div ref={constraintsRef} className="flex h-full w-full overflow-hidden">
            <motion.div
                ref={marquee}
                // style={{ skewX }}
                // onWheel={onWheel}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                dragElastic={0.000001}
                className={cn(
                    "flex h-full w-full overflow-hidden cursor-grab",
                    isDragging && "cursor-grabbing"
                )}
            >
                <ActivityBlock events={events} speed={speed} />
                <ActivityBlock events={events} speed={speed} />
            </motion.div>
        </motion.div>
    )
}

export const GithubActivityBar = ({ events }: any) => {
  return (
    <Marquee events={events} />
  );
};
