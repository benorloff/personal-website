"use client"

import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation"
import { GithubActivityBar } from "./github-activity-bar";

interface FrameBorderProps {
    side: 'top' | 'right' | 'bottom' | 'left';
    events?: any;
};

const Top = () => {

    const pathname: string = usePathname();

    const path: string[] = pathname.slice(1).split('/').map((p,i) => {
        let label: string = '';
        label = p.split("-").join(" ")
        label = label.charAt(0).toUpperCase() + label.slice(1);
        return label;
    });

    return (
        <div className="flex h-full gap-4 justify-center items-center">
            {path.map((p, i) => {
                return (
                    <div key={i} className="flex gap-4 items-center">
                        <p className="capitalize">
                            {p}
                        </p>
                        { i !== path.length - 1 && 
                            <ArrowRight className="w-4 h-4" />
                        }
                    </div>
                )
            })}
        </div>
    )
}; 

const Right = () => {
    return (
        <div>
            {/* Content */}
        </div>
    )
}

const Bottom = ({events}: any) => {
    return (
        <div className="flex flex-row w-full h-full overflow-hidden">
            <GithubActivityBar events={events} />
        </div>
    )
}

const Left = () => {
    return (
        <div>
            {/* Content */}
        </div>
    )
}

export const FrameBorder = ({
    side,
    events,
}: FrameBorderProps) => {

    switch (side) {
        case 'top':
            return (
                <Top />
            )
        case 'right':
            return (
                <Right />
            )
        case 'bottom':
            return (
                <Bottom events={events} />
            )
        case 'left':
            return (
                <Left />
            )
        default:
            return null;
    };
}