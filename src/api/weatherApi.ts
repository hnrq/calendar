import axios from "axios";

const weatherApi = axios.create({
  baseURL: "http://dataservice.accuweather.com",
  params: {
    apikey: process.env.REACT_APP_API_KEY,
  },
});

export interface City {
  locationKey: string;
  name: string;
}

interface CityResponse {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export const autocompleteRegion = async (query: string) => {
  if (query === "") return [];

  const { data } = await weatherApi.get<CityResponse[]>(
    "/locations/v1/cities/autocomplete",
    { params: { q: query } }
  );

  const result: City[] = data?.map((city) => ({
    locationKey: city.Key,
    name: `${city.LocalizedName}, ${city.AdministrativeArea.ID} - ${city.Country.LocalizedName}`,
  }));

  return result ?? [];
};

export default weatherApi;
