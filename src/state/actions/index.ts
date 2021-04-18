import { ActionTypes } from "../action-types";

interface GetCovidDataAction {
  type: typeof ActionTypes.COVID_DATA_BY_COUNTRY;
}

interface GetCovidDataSuccessAction {
  type: typeof ActionTypes.COVID_DATA_SUCCESS;
  payload: unknown;
}

interface GetCovidDataErrorAction {
  type: typeof ActionTypes.COVID_DATA_ERROR;
}

interface GetChartCovidDataAction {
  type: ActionTypes.FETCH_CHART_DATA;
}

interface GetChartCovidDataSuccessAction {
  type: ActionTypes.CHART_DATA_SUCCESS;
  payload: unknown;
}

interface GetChartCovidDataErrorAction {
  type: typeof ActionTypes.CHART_DATA_ERROR;
}

export type Action =
  | GetCovidDataAction
  | GetCovidDataSuccessAction
  | GetCovidDataErrorAction
  | GetChartCovidDataAction
  | GetChartCovidDataSuccessAction
  | GetChartCovidDataErrorAction;
