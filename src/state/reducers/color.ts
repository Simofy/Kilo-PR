import { ActionTypes } from "../action-types";

export const color = (
  state = "#ddd",
  action: { payload: string; type: string }
): string => {
  switch (action.type) {
    case ActionTypes.CHANGE_COLOR:
      return (state = action.payload);
    default:
      return state;
  }
};
