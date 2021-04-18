import axios, { AxiosResponse } from "axios";
import { PRIMARY_URL, CHART_DATA_URL } from "./constant";

interface ICovidData {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}
[];

export const handleGetRequest = async <T>(url?: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    method: "GET",
    url: `${PRIMARY_URL}/${url}`,
  });

  return response.data;
};

export const handleGetChartData = async <T>(country?: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios({
    method: "GET",
    url: `${CHART_DATA_URL}/total/dayone/country/${country}`,
  });

  return response.data;
};
