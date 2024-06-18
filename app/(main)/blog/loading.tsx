import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="flex flex-col max-w-2xl mx-auto py-8 gap-4 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-48" />
                ))}
            </div>
        </div>
    )
}

export default Loading;