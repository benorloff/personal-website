import { Frame } from "@/components/frame";
import { WeatherBar } from "@/components/weather";
import { getWeather } from "@/lib/weather";
import { Globe } from "lucide-react";

export default async function Home() {

  const { temperature, label, icon } = await getWeather();

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
        <div className="flex flex-row w-full h-full">
          <WeatherBar temperature={temperature} label={label} icon={icon} />
          <div className="grow h-full flex items-center justify-center">
            breadcrumbs
          </div>
        </div>
      </Frame>
      <div className="container py-8 flex flex-row gap-8 w-full h-full text-4xl font-semibold">
        <div className="flex-1 border custom-border-color rounded-sm p-8 bg-foreground/5 backdrop-blur-sm">Software engineer.</div>
        <div className="flex-1 place-content-end text-right border custom-border-color rounded-sm p-8 bg-foreground/5 backdrop-blur-sm">Ben Orloff.</div>
      </div>
    </div>
  );
}
