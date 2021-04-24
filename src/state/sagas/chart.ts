import { takeEvery, call, put, all } from "redux-saga/effects";
import { handleGetRequest } from "../../api/get";
import { ActionTypes } from "../action-types";

interface IChartData {
  country: string;
  timeline: {
    cases: { key: string; value: number };
    recovered: { key: string; value: number };
    deaths: { key: string; value: number };
  };
}

const formatData = (chartData: IChartData) => {
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
  return modifiedChartData;
};

export function* watchChartAction(): Generator<unknown> {
  yield takeEvery(ActionTypes.GET_CHART_DATA, getChartData);
}

export function* getChartData(action: {
  type: string;
  payload: string;
}): Generator<unknown> {
  try {
    yield put({ type: ActionTypes.LOADING_TRUE });
    const [vaccinesData, chartData]: any = yield all([
      call(
        handleGetRequest,
        `vaccine/coverage/countries/${action.payload}?lastdays=90`
      ),
      call(handleGetRequest, `historical/${action.payload}?lastdays=360`),
    ]);

    const modifiedChartData = formatData(chartData);

    yield put({
      type: ActionTypes.GET_CHART_DATA_SUCCESS,
      payload: { modifiedChartData, vaccinesData },
    });

    yield put({
      type: ActionTypes.ERROR_FALSE,
    });
  } catch {
    yield put({ type: ActionTypes.ERROR_TRUE });
    console.log("error in chart datas request");
  } finally {
    yield put({ type: ActionTypes.LOADING_FALSE });
  }
}
