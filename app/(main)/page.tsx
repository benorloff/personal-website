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
        <WeatherBar temperature={temperature} label={label} icon={icon} />
      </Frame>
      <div className="container py-8 flex flex-row w-full h-full text-4xl font-semibold">
        <div className="flex-1">Software engineer.</div>
        <div className="flex-1 mt-auto text-right">Ben Orloff.</div>
      </div>
    </div>
  );
}
