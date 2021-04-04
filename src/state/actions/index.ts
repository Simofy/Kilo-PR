import { ActionTypes } from "../action-types";

interface BoardRequestSuccessAction {
  type: ActionTypes.BOARD_STATE_SUCCESS;
  payload: any;
}
interface BoardRequestErrorAction {
  type: ActionTypes.BOARD_STATE_ERROR;
}

interface FetchBoardRequestAction {
  type: ActionTypes.FETCH_BOARD_DATA;
}

export type Action =
  | BoardRequestErrorAction
  | BoardRequestSuccessAction
  | FetchBoardRequestAction;
