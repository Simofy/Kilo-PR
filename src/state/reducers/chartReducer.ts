import { Action } from "../actions";
import { ActionTypes } from "../action-types";

interface IBoardData {
  loading: boolean;
  error: null | boolean;
  countryCode: string;
  countriesInfo:
    | {
        Country: string;
        Confirmed: number;
        Deaths: number;
        Recovered: number;
        Active: number;
        Date: string;
      }[]
    | unknown;
}

const initialState: IBoardData = {
  loading: false,
  error: null,
  countriesInfo: [],
  countryCode: "",
};

export const chartReducer = (
  state = initialState,
  action: Action
): IBoardData => {
  switch (action.type) {
    case ActionTypes.FETCH_CHART_DATA:
      return {
        ...state,
        countryCode: action.payload,
        loading: true,
      };
    case ActionTypes.CHART_DATA_SUCCESS:
      return {
        ...state,
        countriesInfo: action.payload,
        loading: false,
      };
    case ActionTypes.CHART_DATA_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
