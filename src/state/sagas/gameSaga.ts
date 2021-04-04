import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import { handleGetRequest } from "../../api/get";
import { ActionTypes } from "../action-types";

export function* watchGetBoard(): Generator<unknown> {
  yield takeEvery(ActionTypes.FETCH_BOARD_DATA, getBoardData);
}

export function* getBoardData(): Generator<unknown> {
  const boardData: any = yield call(handleGetRequest);

  const prevBoardData: any = yield select((state) => state.boardData.data);
  yield delay(5);

  if (boardData.length !== prevBoardData.length) {
    yield put({ type: ActionTypes.BOARD_STATE_SUCCESS, payload: boardData });
    yield put({ type: ActionTypes.FETCH_BOARD_DATA });
  } else {
    yield put({ type: ActionTypes.FETCH_BOARD_DATA });
  }
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetBoard()]);
}
