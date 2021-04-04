import { Action } from "../actions";
import { ActionTypes } from "../action-types";

interface IBoardData {
  loading: boolean;
  error: null | boolean;
  data: [] | unknown;
}

const initialState: IBoardData = {
  loading: false,
  error: null,
  data: [],
};

export const game = (state = initialState, action: Action): IBoardData => {
  switch (action.type) {
    case ActionTypes.FETCH_BOARD_DATA:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.BOARD_STATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ActionTypes.BOARD_STATE_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
