import { Action } from "../actions";
import { ActionTypes } from "../action-types";

interface IModals {
  covidModal: boolean;
}

const initialState: IModals = {
  covidModal: false,
};

export const modals = (state = initialState, action: Action): IModals => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        covidModal: !state.covidModal,
      };

    default:
      return state;
  }
};
