import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { userId, product, quantity, name, price, image, stock } =
        action.payload;
      const userCart = state[userId] || { cartItems: [] };
      const existingCartItem = userCart.cartItems.find(
        (item) => item.product === product
      );

      if (existingCartItem) {
        // Update quantity if item already exists
        const updatedCartItems = userCart.cartItems.map((item) =>
          item.product === product ? { ...item, quantity: quantity } : item
        );

        return {
          ...state,
          [userId]: {
            ...userCart,
            cartItems: updatedCartItems,
          },
        };
      } else {
        // Add new item to cart
        return {
          ...state,
          [userId]: {
            ...userCart,
            cartItems: [
              ...userCart.cartItems,
              {
                product,
                quantity,
                name,
                price,
                image,
                stock,
              },
            ],
          },
        };
      }

    case REMOVE_CART_ITEM:
      let id = action.payload.userId;
      id = id.toString();
      const userCartForRemoval = state[id];
      if (!userCartForRemoval) {
        // If the user's cart doesn't exist, return the current state as is
        return state;
      }

      const updatedCartItems = userCartForRemoval.cartItems.filter(
        (item) => item.product !== action.payload.id
      );

      return {
        ...state,
        [action.payload.userId]: {
          ...userCartForRemoval,
          cartItems: updatedCartItems,
        },
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
