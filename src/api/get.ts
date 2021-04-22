import axios, { AxiosResponse } from "axios";
import { URLS } from "./constant";

export const handleGetRequest = async <T>(url?: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    headers: {
      require: [],
    },
    method: "GET",
    url: `${URLS.CORS}${URLS.PRIMARY_URL}/${url}`,
  });

  return response.data;
};

export const handleGetChartData = async <T>(country?: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    headers: {
      require: [],
    },
    method: "GET",
    url: `${URLS.CORS}${URLS.CHART_DATA}/total/dayone/country/${country}`,
  });

  return response.data;
};

export const getVaccineDataRequest = async <T>(country: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    headers: {
      require: [],
    },
    method: "GET",
    url: `${URLS.CORS}${URLS.PRIMARY_URL}/vaccine/coverage/countries/${country}?lastdays=90`,
  });

  return response.data;
};
