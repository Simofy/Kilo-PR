import { ActionTypes } from "../action-types";

interface BoardRequestSuccessAction {
  type: typeof ActionTypes.FETCH_SUCCESS;
  payload: unknown;
}
interface BoardRequestErrorAction {
  type: typeof ActionTypes.FETCH_ERROR;
}

interface FetchBoardRequestAction {
  type: typeof ActionTypes.FETCH_COVID_DATA_BY_COUNTRY;
}

interface SetChoosenColorAction {
  type: typeof ActionTypes.SET_COUNTRY;
  payload: any;
}

export type Action =
  | BoardRequestErrorAction
  | BoardRequestSuccessAction
  | FetchBoardRequestAction
  | SetChoosenColorAction;
