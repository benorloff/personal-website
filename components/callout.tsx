import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface CalloutProps {
    type: 'info' | 'warning' | 'danger' | 'success';
    children: React.ReactNode;
}

type CalloutIconProps = Omit<CalloutProps, 'children'> & {
    className?: string;
}

const CalloutIcon = ({
    type,
    className, 
}: CalloutIconProps): React.ReactNode => {

        const iconStyle = cn(
            "absolute h-12 w-12 -top-6 -right-6 rounded-full bg-card backdrop-blur-3xl",
            type === 'info' && 'text-blue-500 bg-blue-500/20',
            type === 'warning' && 'text-yellow-500 bg-yellow-500/20',
            type === 'danger' && 'text-red-500 bg-red-500/20',
            type === 'success' && 'text-green-500 bg-green-500/20',
            className
        )

        switch (type) {
            case 'info':
                return (
                    <Info className={iconStyle} />
                )
            case 'warning':
                return (
                    <CircleAlert className={iconStyle} />
                )
            case 'danger':
                return (
                    <CircleX className={iconStyle} />
                )
            case 'success':
                return (
                    <CircleCheck className={iconStyle} />
                )
            default:
                return (
                    <Info className={iconStyle} />
                )
        }
}


export const Callout = ({
    type,
    children,
}: CalloutProps) => {

    return (
        <Card 
            className={cn(
                "relative rounded-sm pt-6 my-10",
                type === 'info' && 'bg-blue-500/10',
                type === 'warning' && 'bg-yellow-500/10',
                type === 'danger' && 'bg-red-500/10',
                type === 'success' && 'bg-green-500/10',
            )}
        >
            <CardContent>
                {children}
            </CardContent>
            <CalloutIcon type={type} />
        </Card>
    )
}