import Image, { ImageProps } from "next/image";

export const NextImage = (props: ImageProps) => {
    return (
        <Image
            {...props}
        />
    )
}