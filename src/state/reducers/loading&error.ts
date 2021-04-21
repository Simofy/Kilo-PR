import { Action } from "../actions";
import { ActionTypes } from "../action-types";

interface ILoadingAndError {
  loading: boolean;
  error: null | boolean;
}

const initialState: ILoadingAndError = {
  loading: false,
  error: null,
};

export const loadingAndErrorReducer = (
  state = initialState,
  action: Action
): ILoadingAndError => {
  switch (action.type) {
    case ActionTypes.LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.ERROR_TRUE:
      return {
        ...state,
        error: true,
      };
    case ActionTypes.ERROR_FALSE:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};
