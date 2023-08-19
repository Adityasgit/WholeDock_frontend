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
  (
    sort,
    page = 1,
    keyword = "",
    price = [0, 10000],
    category = "",
    rating = 0,
    keywords = "",
    company = ""
  ) =>
  async (dispatch) => {
    try {
      console.log(page);
      let url = `/api/v1/products`;
      // sort logic
      if (sort.sort.val) {
        url = `/api/v1/products?sort=${
          sort.sort.val && sort.sort.val
        }&page=${page}`;
      }
      // filter logic
      else {
        url = `/api/v1/products?keyword=${keyword}&page=${page}&MRP[gte]=${
          price[0]
        }&MRP[lte]=${price[1]}${category && `&category=${category}`}${
          rating !== 0 ? `&ratings[gte]=${rating}` : ""
        }${keywords !== "" ? `&keywords=${keywords}` : ""}${
          company !== "" ? `&companyName=${company}` : ""
        }`;
      }
      // on request
      dispatch({ type: ALL_PRODUCT_REQUEST });
      const { data } = await axios.get(url);
      // on success
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      // on error
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
