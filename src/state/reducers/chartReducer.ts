import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import {
  ICountriesInfo,
  ICovidData,
  IVaccinationData,
} from "../../types/covidTypes";

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
  action: Action
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
