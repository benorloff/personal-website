import { cn } from "@/lib/utils"

interface FrameProps {
    position: "top" | "right" | "bottom" | "left" | "center";
    children: React.ReactNode;
    className?: string;
}

export const Frame = ({
    position,
    children,
    className,
}: FrameProps) => {
    return (
        <div 
            className={cn(
                "fixed",
                position === "top" && "fixed top-0 left-12 lg:left-16 right-12 lg:right-16 h-12 lg:h-16 border-b",
                position === "left" && "fixed left-0 top-12 lg:top-16 bottom-12 lg:bottom-16 w-12 lg:w-16 border-r",
                position === "right" && "fixed right-0 top-12 lg:top-16 bottom-12 lg:bottom-16 w-12 lg:w-16 border-l",
                position === "bottom" && "fixed bottom-0 left-12 lg:left-16 right-12 lg:right-16 h-12 lg:h-16 border-t",
                position === "center" && "absolute top-12 lg:top-16 right-12 lg:right-16 bottom-12 lg:bottom-16 left-12 lg:left-16",
                className
            )}
        >
            {children}
        </div>
    )
}