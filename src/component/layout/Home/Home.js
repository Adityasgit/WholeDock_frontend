import React, { useEffect, useContext } from "react";
import Head from "../Header/head";
import "../Home/Home.css";
import { clearErrors, getProducts } from "../../../actions/productAction";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../utils/Loader";
import ButtonContext from "../../../context/ButtonContext";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const { sort } = useContext(ButtonContext);

  useEffect(() => {
    if (error) {
      alert(error);
      clearErrors();
    }
    dispatch(getProducts(sort, 1));
  }, [dispatch, error, sort]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Head />
          <h2 id="sc" className="featured">
            Featured Products
          </h2>
          <div className="product-container">
            {products &&
              products.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  rating={product.ratings}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
