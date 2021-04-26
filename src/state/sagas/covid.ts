import { takeEvery, call, put, all } from "redux-saga/effects";
import { handleGetRequest } from "../../api/get";
import { ActionTypes } from "../action-types";
import { watchChartAction } from "./chart";

export function* watchGetCovidInfo(): Generator<unknown> {
  yield takeEvery(ActionTypes.GET_COVID_DATA, getCovidData);
}

export function* getCovidData(): Generator<unknown> {
  yield put({ type: ActionTypes.LOADING_TRUE });
  try {
    const covidData = yield call(handleGetRequest, "countries");
    const globalCases = yield call(handleGetRequest, "all");

    yield put({ type: ActionTypes.SET_GLOBAL_CASES, payload: globalCases });
    yield put({ type: ActionTypes.GET_COVID_DATA_SUCCESS, payload: covidData });

    yield put({ type: ActionTypes.LOADING_FALSE });
    yield put({ type: ActionTypes.ERROR_FALSE });
  } catch (err) {
    yield put({ type: ActionTypes.ERROR_TRUE });
  }
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetCovidInfo(), watchChartAction()]);
}
