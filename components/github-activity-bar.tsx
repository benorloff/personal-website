"use client";

import { formatDistance } from "date-fns";
import { githubEventTypes } from "@/lib/github";
import { ActivityIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { useSpring, useTransform, motion } from "framer-motion";
import { useRaf, useRafLoop } from "react-use";

const Content = ({events}: any) => {
    return (
        <div className="flex h-full w-full overflow-x-scroll p-1">
            {events.map((event: any, i: number) => {
                const { outputText, icon } = githubEventTypes.find(
                    (e) => e.event === event.type) 
                    || { outputText: '', icon: undefined };
                return (
                    <div
                        key={event.id}
                        className="flex-1 text-sm font-normal flex h-full min-w-max justify-center items-center gap-2 px-3 text-nowrap"
                    >
                        <img
                            src={event.actor.avatar_url}
                            alt={event.actor.display_login}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <div>
                            {icon ? icon : <ActivityIcon />}
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
    speed: any,
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
        <div ref={block} className="flex h-full">
            <Content events={events} />
        </div>
    )
};

const Marquee = ({events}: any) => {
    const marquee = useRef(null);
    const slowDown = useRef(false);
    // const isScrolling = useRef(false);
    const constraintsRef = useRef(null);

    const x = useRef<number>(0);
    // const w = useRef(window.innerWidth).current;
    const speed = useSpring(1, {
        damping: 40,
        stiffness: 90,
        mass: 5,
    });
    // const opacity = useTransform(speed, [-w * 0.25, 0, w * 0.25], [1, 0, 1]);
    // const skewX = useTransform(speed, [-w * 0.25, 0, w * 0.25], [-25, 0, 25]);

    const loop = () => {
        if (slowDown.current || Math.abs(x.current) < 0.014) return;
        x.current *= 0.66;
        if (x.current < 0) {
          x.current = Math.min(x.current, 0);
        } else {
          x.current = Math.max(x.current, 0);
        }
        speed.set(2 + x.current);
      };

    useRafLoop(loop, true);

    return (
        <motion.div ref={constraintsRef} className="flex h-full w-full">
            <motion.div
                ref={marquee}
                className="flex h-full w-full overflow-hidden"
            >
                <ActivityBlock events={events} speed={speed} />
                <ActivityBlock events={events} speed={speed} />
            </motion.div>
        </motion.div>
    )
}

export const GithubActivityBar = ({ events }: any) => {
  return (
    <Marquee events={events}/>
  );
};
