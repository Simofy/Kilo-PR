import { Action } from "../actions";
import { ActionTypes } from "../action-types";

interface IVaccinationData {
  country: string;
  timeline: any;
}

interface IChartData {
  loading: boolean;
  error: null | boolean;
  countryCode: string;
  vaccinated: IVaccinationData[] | [];
  countriesInfo:
    | {
        Country: string;
        Confirmed: number;
        Deaths: number;
        Recovered: number;
        Active: number;
        Date: string;
      }[]
    | unknown;
}

const initialState: IChartData = {
  loading: false,
  error: null,
  vaccinated: [],
  countriesInfo: [],
  countryCode: "",
};

export const chartReducer = (state = initialState, action: any): IChartData => {
  switch (action.type) {
    case ActionTypes.FETCH_CHART_DATA:
      return {
        ...state,
        countryCode: action.payload,
        loading: true,
      };
    case ActionTypes.CHART_DATA_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        countriesInfo: action.payload.chartData,
        vaccinated: action.payload.vaccinesData,
        loading: false,
      };
    case ActionTypes.CHART_DATA_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
