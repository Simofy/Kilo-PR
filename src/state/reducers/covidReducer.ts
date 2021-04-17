import { Action } from "../actions";
import { ActionTypes } from "../action-types";

interface IBoardData {
  loading: boolean;
  error: null | boolean;
  country: string;
  data: [] | unknown;
}

const initialState: IBoardData = {
  loading: false,
  error: null,
  country: "LT",
  data: [],
};

export const covidReducer = (
  state = initialState,
  action: Action
): IBoardData => {
  switch (action.type) {
    case ActionTypes.FETCH_COVID_DATA_BY_COUNTRY:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        error: true,
      };
    case ActionTypes.SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    default:
      return state;
  }
};
