const API_URL = `https://api.tomorrow.io/v4/weather/realtime?location=tucson&units=imperial&apikey=${process.env.TOMORROW_API_KEY}`;

export interface Weather {
  temperature: number;
  weatherCode: number;
  weatherLabel: string;
}

export const weatherCodes = (
  weatherCode: Weather["weatherCode"]
): string => {

  let label: Weather["weatherLabel"] = '';
  // let icon: WeatherResult['icon'] = undefined;

  switch (true) {
    case weatherCode === 1000:
      label = 'clear';
      // icon = <Sun />;
      break;
    case weatherCode > 1000 && weatherCode < 2000:
      label = 'cloudy';
      // icon = <CloudSun />;
      break;
    case weatherCode >= 4000 && weatherCode < 5000:
      label = 'raining';
      // icon = <CloudRain />;
      break;
    case weatherCode >= 5000 && weatherCode < 6000:
      label = 'snowing';
      // icon = <CloudSnow />;
      break;
    case weatherCode >= 6000 && weatherCode < 8000:
      label = 'hailing';
      // icon = <CloudHail />;
      break;
    case weatherCode === 8000:
      label = 'thundering';
      // icon = <CloudLightning />;
      break;
    default:
      label = 'clear';
      // icon = <Sun />;
      break;
  }

  return label; 
};

export const getWeather = async (): Promise<Weather> => {

  let weather: Weather = {
    temperature: 0,
    weatherCode: 0,
    weatherLabel: '',
  };

  try {
    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      }
    })
    const {data} = await res.json();
    weather = {
      temperature: Math.round(data.values.temperature),
      weatherCode: data.values.weatherCode,
      weatherLabel: weatherCodes(data.values.weatherCode),
    }
  } catch (error) {
    console.error(error)
  }

  return weather;
}