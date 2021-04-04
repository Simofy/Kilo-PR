import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import { handleGetRequest } from "../../api/get";

export function* watchGetBoard(): Generator<unknown> {
  yield takeEvery("FETCH_BOARD_DATA", getBoardData);
}

export function* getBoardData(): Generator<unknown> {
  const boardData: any = yield call(handleGetRequest);

  const prevBoardData: any = yield select((state) => state.boardData.data);
  yield delay(5000);

  console.log(prevBoardData, boardData);

  if (boardData.length !== prevBoardData.length) {
    yield put({ type: "BOARD_STATE_SUCCESS", payload: boardData });
    yield put({ type: "FETCH_BOARD_DATA" });
  } else {
    yield put({ type: "FETCH_BOARD_DATA" });
  }
}

export function* rootSaga(): Generator<unknown> {
  yield all([watchGetBoard()]);
}
