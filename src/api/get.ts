import axios from "axios";
import { BASE_URL, COUNTRY_BY_COORD } from "./constant";
import { mapToken } from "../containers/Map";

const mapQuestApiKey = "SK52bBTeRqYH1WQPMm22V3XKE4h0pWg2";

export const handleGetRequest = async <T>(url?: string): Promise<T> => {
  const response = await axios({
    method: "GET",
    url: BASE_URL + url,
  });
  return response.data;
};

export const getCovidDataByCountry = async <T>(
  country?: string
): Promise<T> => {
  const response: any = await axios({
    method: "GET",
    url: `${BASE_URL}country/${country}/status/confirmed?from=2020-03-01T00:00:00Z&to=2021-04-01T00:00:00Z`,
  });
  let dateString: string;
  const modifiedData: any = [];
  response.data.map((details: { Cases: number; Date: string }) => {
    dateString = new Date(details.Date).toISOString().substr(0, 10);

    const { Cases } = details;

    modifiedData.push({ dateString, Cases });
  });

  return modifiedData;
};

export const getCountryByCoordinates = async <T>(
  lang: string,
  lat: string
): Promise<T> => {
  const response: any = await axios({
    method: "GET",
    url: `https://www.mapquestapi.com/geocoding/v1/reverse?key=${mapQuestApiKey}&location=${lang}%2C${lat}&outFormat=json&thumbMaps=false`,
  });
  return await response.data;
};

//39.755695%2C-104.995986&outFormat=json&thumbMaps=false

//example endpoint
//from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
