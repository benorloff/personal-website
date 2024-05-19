'use client'

import { TestimonialCarousel } from "@/components/testimonial-carousel";

const AboutPage = () => {
    return (
        <div className="h-full w-full overflow-scroll">
            <div className="flex flex-col h-full w-full items-center justify-center text-balance text-center gap-4">
                <h1 className="w-3/4 text-8xl">It's nice to meet you.</h1>
                <p>I'm a software engineer and designer with a passion for creating beautiful and functional user experiences.</p>
            </div>
            <div className="flex h-full w-full items-center justify-center text-balance text-center">
                <h3>I'm currently looking for new opportunities. If you'd like to work together, feel free to reach out.</h3>
            </div>
            <TestimonialCarousel />
        </div>
    )
}

export default AboutPage;