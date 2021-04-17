import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { getCovidDataByCountry } from "../../api/get";
import { ActionTypes } from "../action-types";

export function* watchGetCovidInfo(): Generator<unknown> {
  yield takeEvery(ActionTypes.FETCH_COVID_DATA_BY_COUNTRY, getCovidData);
}

export function* watchCountryChange(): Generator<unknown> {
  yield takeEvery(ActionTypes.SET_COUNTRY, getCovidData);
}
export function* getCovidData(): Generator<unknown> {
  const selectedCountry: any = yield select((state) => state.covidData.country);

  const covidData: any = yield call(getCovidDataByCountry, selectedCountry);

  yield put({ type: ActionTypes.FETCH_SUCCESS, payload: covidData });
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetCovidInfo(), watchCountryChange()]);
}
