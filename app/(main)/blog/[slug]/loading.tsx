import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => {
                return (
                    <Skeleton key={i} className="w-full h-24" />
            )})}
        </div>
    )
}

export default Loading;