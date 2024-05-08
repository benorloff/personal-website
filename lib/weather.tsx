import { CloudHail, CloudLightning, CloudRain, CloudSnow, CloudSun, Cloudy, Sun } from "lucide-react"

const API_URL = `https://api.tomorrow.io/v4/weather/realtime?location=tucson&units=imperial&apikey=${process.env.TOMORROW_API_KEY}`;

export interface Weather {
  temperature: number;
  label: string;
  icon?: React.ReactNode;
}

export const weatherCodes = (
  weatherCode: number
): Omit<Weather, "temperature"> => {

  let label: string = '';
  let icon: React.ReactNode = undefined;

  switch (true) {
    case weatherCode === 1000:
      label = 'Clear';
      icon = <Sun />;
      break;
    case weatherCode > 1000 && weatherCode < 2000:
      label = 'Cloudy';
      icon = <CloudSun />;
      break;
    case weatherCode >= 4000 && weatherCode < 5000:
      label = 'Rain';
      icon = <CloudRain />;
      break;
    case weatherCode >= 5000 && weatherCode < 6000:
      label = 'Snow';
      icon = <CloudSnow />;
      break;
    case weatherCode >= 6000 && weatherCode < 8000:
      label = 'Hail';
      icon = <CloudHail />;
      break;
    case weatherCode === 8000:
      label = 'Thunderstorm';
      icon = <CloudLightning />;
      break;
    default:
      label = 'Clear';
      icon = <Sun />;
      break;
  }

  return { label, icon }; 
};

export const getWeather = async (): Promise<Weather> => {

  let weather: Weather = {
    temperature: 0,
    label: '',
    icon: undefined,
  };

  try {
    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    const { data } = await res.json();
    const { label, icon } = weatherCodes(data.weatherCode);
    weather = {
      temperature: Math.round(data.values.temperature),
      label,
      icon,
    }
  } catch (error) {
    console.error(error)
  }

  return weather;
}