import { Frame } from "@/components/frame";

const WorkPage = async () => {

    return (
        <div>
            <Frame position="top">
                top
            </Frame>
            <Frame position="left">
                left
            </Frame>
            <Frame position="right">
                right
            </Frame>
            <Frame position="bottom">
                bottom
            </Frame>
            <Frame position="center">
                <h1 className="text-4xl font-semibold">Work</h1>
            </Frame>
        </div>
    )
}

export default WorkPage;