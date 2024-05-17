export const TestimonialCarousel = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex gap-10 overflow-scroll">
            {children}
        </div>
    )
}