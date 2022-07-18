import { useEffect, useMemo } from "react";

import useFetch, { IncomingOptions } from "use-http";

export interface City {
  id: string;
  lat: number;
  lon: number;
  name: string;
}

interface CityResponse {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const useCitySearch = (q: string, options?: IncomingOptions) => {
  const searchParams = useMemo(
    () =>
      new URLSearchParams({ q, appid: process.env.REACT_APP_API_KEY ?? "" }),
    [q]
  );

  const fetch = useFetch<City[]>(process.env.REACT_APP_API_HOST, {
    onNewData: (_, newData?: CityResponse[]) =>
      newData?.map((city) => ({
        lat: city.lat,
        lon: city.lon,
        id: `${city.lat}${city.lon}`,
        name: `${city.name}, ${city.country}`,
      })) ?? [],
    ...options,
  });

  useEffect(() => {
    if (Boolean(q)) fetch.get(`/geo/1.0/direct?${searchParams.toString()}`);
  }, [q, fetch, searchParams]);

  return fetch;
};

export interface Weather {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
}

export const useWeather = (options?: IncomingOptions) => {
  const fetch = useFetch<Weather>(process.env.REACT_APP_API_HOST, {
    onNewData: (_, newData?: Weather) =>
      ({
        weather: newData?.weather,
        main: newData?.main,
      } ?? {}),
    ...options,
  });

  return {
    ...fetch,
    get: async (city: City) => {
      const params = new URLSearchParams({
        lat: city.lat.toString(),
        lon: city.lon.toString(),
        appid: process.env.REACT_APP_API_KEY ?? "",
      });

      return fetch.get(`/data/2.5/weather?${params.toString()}`);
    },
  };
};
