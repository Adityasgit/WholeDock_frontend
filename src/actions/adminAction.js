import { SET_COMPANY } from "../constants/AdminConstants";

export const setCompany = (companies) => (dispatch) => {
  dispatch({ type: SET_COMPANY, payload: companies });
};
