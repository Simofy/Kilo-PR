import { ActionTypes } from "../action-types";
import {
  ICovidData,
  ICountriesInfo,
  IVaccinationData,
} from "../../types/covidTypes";

interface GetCovidDataAction {
  type: typeof ActionTypes.GET_COVID_DATA;
}

interface GetCovidDataSuccessAction {
  type: typeof ActionTypes.GET_COVID_DATA_SUCCESS;
  payload: ICovidData[];
}

interface GetChartCovidDataAction {
  type: ActionTypes.GET_CHART_DATA;
}

interface GetChartCovidDataSuccessAction {
  type: ActionTypes.GET_CHART_DATA_SUCCESS;
  payload: {
    modifiedChartData: ICountriesInfo[];
    vaccinesData: IVaccinationData[];
  };
}

interface ErrorTrueAction {
  type: ActionTypes.ERROR_TRUE;
}

interface ErrorFalseAction {
  type: ActionTypes.ERROR_FALSE;
}

interface LoadingTrueAction {
  type: ActionTypes.LOADING_TRUE;
}

interface LoadingFalseAction {
  type: ActionTypes.LOADING_FALSE;
}

interface SetCountryAction {
  type: ActionTypes.SET_COUNTRY;
  payload: string;
}

interface SetGlobalCasesAction {
  type: ActionTypes.SET_GLOBAL_CASES;
  payload: unknown;
}

export type Action =
  | GetCovidDataAction
  | GetCovidDataSuccessAction
  | GetChartCovidDataAction
  | GetChartCovidDataSuccessAction
  | ErrorTrueAction
  | ErrorFalseAction
  | LoadingTrueAction
  | LoadingFalseAction
  | SetCountryAction
  | SetGlobalCasesAction;
