import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import {
  ICountriesInfo,
  ICovidData,
  IVaccinationData,
} from "../../types/covidTypes";

interface IChartData {
  vaccinated: IVaccinationData;
  countriesInfo: ICountriesInfo[];
  covidData: ICovidData[];
  countryCode: string;
  globalCases: ICovidData;
  period: string;
}

const initialState: IChartData = {
  vaccinated: { country: "", timeline: "" },
  countriesInfo: [],
  covidData: [],
  countryCode: "",
  globalCases: {} as ICovidData,
  period: "360",
};

export const chartReducer = (
  state = initialState,
  action: Action
): IChartData => {
  switch (action.type) {
    case ActionTypes.CONTROL_CHART_PERIOD:
      return {
        ...state,
        period: action.payload,
      };
    case ActionTypes.SET_GLOBAL_CASES:
      return {
        ...state,
        globalCases: action.payload,
      };
    case ActionTypes.SET_COUNTRY:
      return {
        ...state,
        countryCode: action.payload,
      };
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
