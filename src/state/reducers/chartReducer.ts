import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import { ICountriesInfo, ICovidData } from "../../types/covidTypes";

export interface IVaccinationData {
  country: string;
  timeline?: any;
}

interface IChartData {
  vaccinated: IVaccinationData[];
  countriesInfo: ICountriesInfo[];
  covidData: ICovidData[];
}

const initialState: IChartData = {
  vaccinated: [],
  countriesInfo: [],
  covidData: [],
};

export const chartReducer = (
  state = initialState,
  action: Action | any
): IChartData => {
  switch (action.type) {
    case ActionTypes.GET_CHART_DATA_SUCCESS:
      return {
        ...state,
        countriesInfo: action.payload.modifiedChartData,
        vaccinated: action.payload.vaccinesData,
      };
    case ActionTypes.GET_COVID_DATA_SUCCESS:
      return {
        ...state,
        covidData: action.payload,
      };

    default:
      return state;
  }
};
