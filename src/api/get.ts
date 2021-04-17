import axios from "axios";
import { BASE_URL } from "./constant";

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
    url: `${BASE_URL}/total/dayone/country/${country}`,
  });

  let dateString: string;
  const modifiedData: any = [];
  response.data.map(
    (details: {
      Confirmed: number;
      Deaths: number;
      Recovered: number;
      Active: number;
      Date: string;
    }) => {
      dateString = new Date(details.Date).toISOString().substr(0, 10);

      const { Confirmed, Deaths, Recovered, Active } = details;

      modifiedData.push({ dateString, Confirmed, Deaths, Recovered, Active });
    }
  );
  if (modifiedData.length > 400) {
    return modifiedData.splice(modifiedData.length - 400, modifiedData.length);
  }

  return modifiedData;
};
