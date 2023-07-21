import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";
// for get all the products
export const getProducts =
  (sort, page = 1, keyword = "", price = [0, 1000], category = "") =>
  async (dispatch) => {
    try {
      console.log(page);
      let url = `/api/v1/products`;
      if (sort.sort.val) {
        url = `/api/v1/products?sort=${
          sort.sort.val && sort.sort.val
        }&page=${page}`;
      } else if (category) {
        url = `/api/v1/products?keyword=${keyword}&page=${page}&MRP[gte]=${price[0]}&MRP[lte]=${price[1]}&category=${category}`;
      } else if (keyword || price) {
        url = `/api/v1/products?keyword=${keyword}&page=${page}&MRP[gte]=${price[0]}&MRP[lte]=${price[1]}`;
      }
      dispatch({ type: ALL_PRODUCT_REQUEST });
      const { data } = await axios.get(url);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// for get the product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
