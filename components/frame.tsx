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
                position === "top" && "fixed top-[10px] left-[58px] right-[58px] h-[48px] border-b",
                position === "left" && "fixed left-[10px] top-[58px] bottom-[58px] w-[48px] border-r",
                position === "right" && "fixed right-[10px] top-[58px] bottom-[58px] w-[48px] border-l",
                position === "bottom" && "fixed bottom-[10px] left-[58px] right-[58px] h-[48px] border-t",
                position === "center" && "absolute top-[58px] right-[58px] bottom-[58px] left-[58px]",
                className
            )}
        >
            {children}
        </div>
    )
}