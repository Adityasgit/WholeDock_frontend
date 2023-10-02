import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  allReviewsReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
  reviewsReducer,
} from "./reducers/productReducer";
import {
  forgotPasswordReducer,
  allUsersReducer,
  profileReducer,
  usersReducer,
  userReducer,
  userDetailsReducer,
  otpReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  OrdersReducer,
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: OrdersReducer,
  allUsers: allUsersReducer,
  users: usersReducer,
  userDetails: userDetailsReducer,
  productReviews: allReviewsReducer,
  reviews: reviewsReducer,
  otp: otpReducer,
});

// Configure redux-persist
const persistConfig = {
  key: "root",
  storage, // Use localStorage as the storage engine
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer, // Use the persisted reducer
  composeWithDevTools(applyMiddleware(...middleware))
);
// Create a persistor for persisting the store
const persistor = persistStore(store);

export { store, persistor };
