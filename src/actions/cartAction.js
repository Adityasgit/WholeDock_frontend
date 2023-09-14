import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

export const addItemToCart = (userId, id, quantity) => async (dispatch) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      userId,
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0]?.url,
      stock: data.product.stock,
      quantity,
    },
  });
};

export const removeCartItem = (userId, id) => async (dispatch) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: { userId, id },
  });
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
};
