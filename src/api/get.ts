import axios from "axios";
import { BASE_URL } from "../constants";

export const handleGetRequest = async <T>(): Promise<T> => {
  let storage: any = localStorage.getItem("boardParams");
  storage = JSON.parse(storage);
  let BOARD_DATA = "";

  if (storage) {
    const { x, y, width, height } = storage;
    BOARD_DATA = `?x=${x}&y=${y}&w=${width}&h=${height}`;
  } else {
    BOARD_DATA = "?x=0&y=0&w=1200&h=1200";
  }

  const response = await axios({
    method: "GET",
    url: BASE_URL + BOARD_DATA,
  });
  return response.data;
};

export const handleGetBoardStatus = async <T>(url: string): Promise<T> => {
  const response = await axios({
    method: "GET",
    url: BASE_URL + url,
  });
  return await response.data;
};
