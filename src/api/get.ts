import axios from "axios";
import { BASE_URL } from "../constants";

export const handleGetRequest = async <T>(url?: string): Promise<T> => {
  const response = await axios({
    method: "GET",
    url: BASE_URL + url,
  });
  return response.data;
};
