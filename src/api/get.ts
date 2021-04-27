import axios, { AxiosResponse } from "axios";
import { URLS } from "./constant";

export const handleGetRequest = async <T>(url?: string): Promise<T> => {
  const { data }: AxiosResponse<T> = await axios({
    method: "GET",
    url: `${URLS.PRIMARY_API}/${url}`,
  });

  return data;
};
