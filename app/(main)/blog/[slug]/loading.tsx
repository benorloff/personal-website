import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="flex h-full w-full overflow-x-hidden overflow-y-auto">
            <div 
                className="hidden sticky lg:flex flex-col basis-1/5 justify-center top-0 left-0 h-[calc(100vh-116px)] w-full p-4"
            >
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-4 mb-4" />
                ))}
            </div>
            <article 
                className="flex flex-col basis-3/5 w-full max-w-2xl mx-auto p-4" 
                data-testid="post-article"
            >
                <Skeleton className="w-full h-8 mb-4" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-32 mb-4" />
                ))}
            </article>
            <div className="basis-1/5"></div>
        </div>
    )
}

export default Loading;