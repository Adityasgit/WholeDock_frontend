import {
  SET_COMPANY,
  SET_ORG,
  SET_DELIVERY,
} from "../constants/AdminConstants";

export const setCompany = (companies) => (dispatch) => {
  dispatch({ type: SET_COMPANY, payload: companies });
};
export const setOrg = (org) => (dispatch) => {
  dispatch({ type: SET_ORG, payload: org });
};
export const setDelivery = (org) => (dispatch) => {
  dispatch({ type: SET_DELIVERY, payload: org });
};
