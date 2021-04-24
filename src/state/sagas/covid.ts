import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  handleGetCovidData,
  handleGetChartData,
  getVaccineDataRequest,
} from "../../api/get";
import { ActionTypes } from "../action-types";

export function* watchChartAction(): Generator<unknown> {
  yield takeEvery(ActionTypes.GET_CHART_DATA, getChartData);
}

export function* watchGetCovidInfo(): Generator<unknown> {
  yield takeEvery(ActionTypes.GET_COVID_DATA, getCovidData);
}

export function* getChartData(action: {
  type: string;
  payload: string;
}): Generator<unknown> {
  try {
    yield put({ type: ActionTypes.LOADING_TRUE });
    const [vaccinesData, chartData]: any = yield all([
      call(getVaccineDataRequest, `${action.payload}`),
      call(handleGetChartData, `${action.payload}`),
    ]);

    const casesToPropoObjects = Object.entries(chartData.timeline.cases).map(
      (key) => {
        return {
          Date: key[0],
          Cases: key[1],
        };
      }
    );

    const modifiedChartData = casesToPropoObjects.map((each, i: number) => {
      return {
        ...each,
        Recovered: Object.values(chartData.timeline.recovered)[i],
        Deaths: Object.values(chartData.timeline.deaths)[i],
        country: chartData.country,
      };
    });

    yield put({
      type: ActionTypes.GET_CHART_DATA_SUCCESS,
      payload: { modifiedChartData, vaccinesData },
    });

    yield put({
      type: ActionTypes.ERROR_FALSE,
    });
  } catch {
    yield put({ type: ActionTypes.ERROR_TRUE });
    console.log("errrroooooooor");
  } finally {
    yield put({ type: ActionTypes.LOADING_FALSE });
  }
}

export function* getCovidData(): Generator<unknown> {
  const covidData: unknown = yield call(handleGetCovidData, "countries");
  console.log(covidData);

  const globalCases = yield call(handleGetCovidData, "all");

  yield put({ type: ActionTypes.SET_GLOBAL_CASES, payload: globalCases });
  yield put({ type: ActionTypes.GET_COVID_DATA_SUCCESS, payload: covidData });
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetCovidInfo(), watchChartAction()]);
}
