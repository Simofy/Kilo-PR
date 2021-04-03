import axios from "axios";
import { BASE_URL } from "../constants";

export const handleGetRequest = async <T>(): Promise<T> => {
  const response = await axios({
    method: "GET",
    url: BASE_URL + "?x=0&y=0&w=1200&h=1200",
  });
  return response.data;
};
