import { takeEvery, call, put, all } from "redux-saga/effects";
import { handleGetRequest } from "../../api/get";
import { ActionTypes } from "../action-types";

export function* watchGetCovidInfo(): Generator<unknown> {
  yield takeEvery(ActionTypes.COVID_DATA_BY_COUNTRY, getCovidData);
}

export function* getCovidData(): Generator<unknown> {
  const covidData: any = yield call(handleGetRequest, "countries");

  console.log(covidData);

  yield put({ type: ActionTypes.COVID_DATA_SUCCESS, payload: covidData });
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetCovidInfo()]);
}
