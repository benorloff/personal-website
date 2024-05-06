import { Frame } from "@/components/frame"


export default function Home() {

  return (
    <div className="h-full w-full">
      <Frame position="top">
        <div />
      </Frame>
      <Frame position="left">
        <div />
      </Frame>
      <Frame position="right">
        <div />
      </Frame>
      <Frame position="bottom">
        <div />
      </Frame>
        <div className="container py-8 flex flex-row w-full h-full text-4xl font-semibold">
          <div className="flex-1">
            Software engineer.
          </div>
          <div className="flex-1 mt-auto text-right">
            Ben Orloff.
          </div>
        </div>
    </div>
  );
}
