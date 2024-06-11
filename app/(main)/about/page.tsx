'use client'

import { TestimonialCarousel } from "@/components/testimonial-carousel";
import Image from "next/image";

const AboutPage = () => {
    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="flex flex-col h-full w-full items-center justify-center text-balance text-center gap-4">
                <h1 className="w-3/4 text-8xl">It's nice to meet you.</h1>
                <p>I'm a software engineer and designer with a passion for creating beautiful and functional user experiences.</p>
            </div>
            <div className="flex h-full w-full gap-8 items-center justify-center text-balance text-center">
                <Image 
                    src="/assets/logos/nextjs-mark.svg" 
                    alt="Next.js Logo" 
                    width={50} 
                    height={50} 
                    className="grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                />
                <Image 
                    src="/assets/logos/tailwindcss-mark.svg" 
                    alt="Tailwind CSS Logo" 
                    width={50} 
                    height={50} 
                    className="grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                />
                <Image 
                    src="/assets/logos/typescript-mark.svg" 
                    alt="Typescript Logo" 
                    width={50} 
                    height={50} 
                    className="grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                />
            </div>
            <TestimonialCarousel />
        </div>
    )
}

export default AboutPage;