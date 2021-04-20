import { takeEvery, call, put, all, select } from "redux-saga/effects";
import {
  handleGetRequest,
  handleGetChartData,
  getVaccineDataRequest,
} from "../../api/get";
import { ActionTypes } from "../action-types";

export function* watchGetCovidInfo(): Generator<unknown> {
  yield takeEvery(ActionTypes.COVID_DATA_BY_COUNTRY, getCovidData);
}

export function* watchChartAction(): Generator<unknown> {
  yield takeEvery(ActionTypes.FETCH_CHART_DATA, getChartData);
}

export function* getChartData(): Generator<unknown> {
  const selectCountryCode = yield select(
    (state) => state.chartData.countryCode
  );

  try {
    let chartData: any = yield call(handleGetChartData, `${selectCountryCode}`);
    chartData = chartData.map((item: any) => {
      return {
        ...item,
        Date: new Date(item.Date).toLocaleDateString(),
      };
    });

    const vaccinesData = yield call(
      getVaccineDataRequest,
      `${selectCountryCode}`
    );

    yield put({
      type: ActionTypes.CHART_DATA_SUCCESS,
      payload: { chartData, vaccinesData },
    });
  } catch {
    yield put({ type: ActionTypes.CHART_DATA_ERROR });
  }
}

export function* getCovidData(): Generator<unknown> {
  const covidData: any = yield call(handleGetRequest, "countries");
  yield put({ type: ActionTypes.COVID_DATA_SUCCESS, payload: covidData });
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetCovidInfo(), watchChartAction()]);
}
