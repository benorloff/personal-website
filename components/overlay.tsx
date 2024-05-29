"use client";

import React, { ForwardedRef, forwardRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const Overlay = forwardRef((
  { 
    caption, 
    scroll 
  }: {
    caption: React.MutableRefObject<HTMLSpanElement>;
    scroll: React.MutableRefObject<number>;
  }, ref: ForwardedRef<HTMLDivElement>) => {
  
  const scrollProgress = useMotionValue(0);

  const translateY = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      onScroll={(e) => {
        scroll.current =
          e.currentTarget.scrollTop / (e.currentTarget.scrollHeight - ( window.innerHeight - 108 ));
        scrollProgress.set(scroll.current);
        caption.current.innerText = scroll.current.toFixed(2);
      }}
      className="absolute w-full h-full top-0 left-0 snap-y snap-proximity overflow-y-auto p-10"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex w-full h-full justify-center items-center top-0 padding-[80px] pointer-events-none snap-center">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Software Engineer.
          </motion.h1>
        </div>
      ))}
      <div className="fixed w-auto top-[58px] right-[58px] bottom-[108px] pointer-events-none snap-center">
        <motion.span
          style={{ top: translateY }}
          className="relative pointer-events-none text-[50px] pr-6 leading-none text-foreground/25"
          ref={caption}
        >
          0.00
        </motion.span>
      </div>
    </div>
  );
});
