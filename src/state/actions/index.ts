import { ActionTypes } from "../action-types";
import { ICovidData } from "../../types/covidTypes";

interface GetCovidDataAction {
  type: typeof ActionTypes.GET_COVID_DATA;
}

interface GetCovidDataSuccessAction {
  type: typeof ActionTypes.GET_COVID_DATA_SUCCESS;
  payload: unknown;
}

interface GetChartCovidDataAction {
  type: ActionTypes.GET_CHART_DATA;
  payload: string;
}

interface GetChartCovidDataSuccessAction {
  type: ActionTypes.GET_CHART_DATA_SUCCESS;
  payload: unknown;
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

export type Action =
  | GetCovidDataAction
  | GetCovidDataSuccessAction
  | GetChartCovidDataAction
  | GetChartCovidDataSuccessAction
  | ErrorTrueAction
  | ErrorFalseAction
  | LoadingTrueAction
  | LoadingFalseAction;
