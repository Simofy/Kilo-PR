import { ActionTypes } from "../action-types";

interface BoardRequestPendingAction {
  type: ActionTypes.BOARD_STATE_PENDING;
}

interface BoardRequestSuccessAction {
  type: ActionTypes.BOARD_STATE_SUCCESS;
  payload: unknown;
}
interface BoardRequestErrorAction {
  type: ActionTypes.BOARD_STATE_ERROR;
}

interface BoardStatusPendingAction {
  type: ActionTypes.BOARD_STATE_PENDING;
}

interface BoardStatusSuccessAction {
  type: ActionTypes.BOARD_STATE_SUCCESS;
  payload: unknown;
}

interface BoardStatusErrorAction {
  type: ActionTypes.BOARD_STATE_ERROR;
}

export type Action =
  | BoardRequestPendingAction
  | BoardRequestErrorAction
  | BoardRequestSuccessAction
  | BoardStatusPendingAction
  | BoardStatusSuccessAction
  | BoardStatusErrorAction;
