const API_URL = `https://api.tomorrow.io/v4/weather/realtime?location=tucson&units=imperial&apikey=${process.env.TOMORROW_API_KEY}`;

export interface Weather {
  temperature: number;
  weatherCode: number;
}

export const getWeather = async (): Promise<Weather> => {

  let weather: Weather = {
    temperature: 0,
    weatherCode: 0,
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
      weatherCode: data.weatherCode,
    }
  } catch (error) {
    console.error(error)
  }

  return weather;
}