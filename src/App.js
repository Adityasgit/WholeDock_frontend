import "./App.css";
import Header from "./component/layout/Header/Header.js";
import ButtonState from "../src/context/ButtonState";
import WebFont from "webfontloader";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/layout/Home/Home";
import ProductDetails from "./component/layout/Product/ProductDetails";
import AllProducts from "./component/layout/Product/AllProducts";
import Search from "./component/layout/Product/Search.js";
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <ButtonState>
        <Header BrandName="NANDI" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<AllProducts />} />
          <Route path="/products/:keyword" element={<AllProducts />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </ButtonState>
    </Router>
  );
}

export default App;
