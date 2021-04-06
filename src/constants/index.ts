export const BASE_URL = "https://simutis.dev/api/board";

export enum ApiRoutes {
  getStatus = "/status",
}

export interface ICellData {
  name: string | unknown;
  color: string | unknown;
  createdAt: string;
}
