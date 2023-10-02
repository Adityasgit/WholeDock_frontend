import { SET_COMPANY, CLEAR_COMPANY } from "../constants/AdminConstants";

export const controlReducer = (state = { companies: [] }, action) => {
  switch (action.type) {
    case SET_COMPANY:
      return {
        ...state,
        companies: action.payload,
      };
    case CLEAR_COMPANY:
      return {
        ...state,
        companies: [],
      };
    default:
      return state;
  }
};
