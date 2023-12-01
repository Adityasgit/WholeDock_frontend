import {
  SET_COMPANY,
  CLEAR_COMPANY,
  SET_ORG,
  SET_DELIVERY,
} from "../constants/AdminConstants";

export const controlReducer = (state = { companies: [], org: {} }, action) => {
  switch (action.type) {
    case SET_COMPANY:
      return {
        ...state,
        companies: action.payload,
      };
    case SET_ORG:
      return {
        ...state,
        org: action.payload,
      };
    case SET_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
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
