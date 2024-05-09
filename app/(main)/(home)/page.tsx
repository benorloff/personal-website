import { Frame } from "@/components/frame";
import { GithubActivityBar } from "@/components/github-activity-bar";
import { WeatherBar } from "@/components/weather";
import { getRecentGithubEvents } from "@/lib/github";
import { getWeather } from "@/lib/weather";

export default async function Home() {
  
  const { temperature, label, icon } = await getWeather();
  
  const events = await getRecentGithubEvents({ per_page: 5, page: 1 });

  return (
    <div className="h-full w-full overflow-scroll">
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
        <div className="flex flex-row w-auto h-full overflow-hidden">
          <WeatherBar temperature={temperature} label={label} icon={icon} />
          <GithubActivityBar events={events} />
        </div>
      </Frame>
      <div className="container py-8 flex flex-row gap-8 w-full h-full text-4xl font-semibold">
        <div className="flex-1 border custom-border-color rounded-sm p-8 bg-foreground/5 backdrop-blur-sm overflow-scroll">
          Software engineer.
        </div>
        <div className="flex-1 place-content-end text-right border custom-border-color rounded-sm p-8 bg-foreground/5 backdrop-blur-sm overflow-scroll">
          Ben Orloff.
        </div>
      </div>
    </div>
  );
}
