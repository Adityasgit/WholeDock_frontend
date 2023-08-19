import "./App.css";
import Header from "./component/layout/Header/Header.js";
import ButtonState from "../src/context/ButtonState";
import WebFont from "webfontloader";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/layout/Home/Home";
import ProductDetails from "./component/layout/Product/ProductDetails";
import AllProducts from "./component/layout/Product/AllProducts";
import Search from "./component/layout/Product/Search";
import Login from "./component/layout/user/Login";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/layout/user/Profile";
import ProfileUpdate from "./component/layout/user/ProfileUpdate";
import PasswordUpdate from "./component/layout/user/PasswordUpdate";
import PasswordForgot from "./component/layout/user/PasswordForgot";
import ResetPassword from "./component/layout/user/ResetPassword.js";
function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <ButtonState>
        <Header BrandName="NANDI" />
        {isAuthenticated && !loading && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<AllProducts />} />
          <Route path="/products/:keyword" element={<AllProducts />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/account" element={<Profile />} />

          <Route exact path="/account/update" element={<ProfileUpdate />} />
          <Route exact path="/password/update" element={<PasswordUpdate />} />
          <Route exact path="/password/forgot" element={<PasswordForgot />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </ButtonState>
    </Router>
  );
}

export default App;
