import { ActionTypes } from "../action-types";

interface BoardRequestSuccessAction {
  type: typeof ActionTypes.BOARD_STATE_SUCCESS;
  payload: unknown;
}
interface BoardRequestErrorAction {
  type: typeof ActionTypes.BOARD_STATE_ERROR;
}

interface FetchBoardRequestAction {
  type: typeof ActionTypes.FETCH_BOARD_DATA;
}

export type Action =
  | BoardRequestErrorAction
  | BoardRequestSuccessAction
  | FetchBoardRequestAction;
