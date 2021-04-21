import { takeEvery, call, put, all, select } from "redux-saga/effects";
import {
  handleGetRequest,
  handleGetChartData,
  getVaccineDataRequest,
} from "../../api/get";
import { ActionTypes } from "../action-types";
import { ICountriesInfo } from "../../types/covidTypes";

export function* watchGetCovidInfo(): Generator<unknown> {
  yield takeEvery(ActionTypes.GET_COVID_DATA, getCovidData);
}

export function* watchChartAction(): Generator<unknown> {
  yield takeEvery(ActionTypes.GET_CHART_DATA, getChartData);
}

export function* getChartData(): Generator<unknown> {
  const selectCountryCode = yield select(
    (state) => state.chartData.countryCode
  );

  try {
    yield put({ type: ActionTypes.LOADING_TRUE });
    const [vaccinesData, chartData]: any = yield all([
      call(getVaccineDataRequest, `${selectCountryCode}`),
      call(handleGetChartData, `${selectCountryCode}`),
    ]);
    const modifiedChartData = chartData.map((item: ICountriesInfo) => {
      return {
        ...item,
        Date: new Date(item.Date).toLocaleDateString(),
      };
    });
    yield put({
      type: ActionTypes.GET_CHART_DATA_SUCCESS,
      payload: { modifiedChartData, vaccinesData },
    });
  } catch {
    yield put({ type: ActionTypes.ERROR_TRUE });
    console.log("errrroooooooor");
  } finally {
    yield put({ type: ActionTypes.LOADING_FALSE });
  }
}

export function* getCovidData(): Generator<unknown> {
  const covidData: unknown = yield call(handleGetRequest, "countries");

  yield put({ type: ActionTypes.GET_COVID_DATA_SUCCESS, payload: covidData });
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetCovidInfo(), watchChartAction()]);
}
