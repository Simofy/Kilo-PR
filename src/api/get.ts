import axios, { AxiosResponse } from "axios";
import { URLS } from "./constant";

export const handleGetCovidData = async <T>(url?: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    method: "GET",
    url: `${URLS.PRIMARY_API}/${url}`,
  });

  return response.data;
};

export const handleGetChartData = async <T>(country?: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    method: "GET",
    url: `${URLS.PRIMARY_API}/historical/${country}?lastdays=360`,
  });

  return response.data;
};

export const getVaccineDataRequest = async <T>(country: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    method: "GET",
    url: `${URLS.PRIMARY_API}/vaccine/coverage/countries/${country}?lastdays=90`,
  });

  return response.data;
};
