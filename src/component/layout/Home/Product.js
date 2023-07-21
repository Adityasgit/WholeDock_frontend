import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product, rating }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 25,
    value: rating,
    isHalf: true,
  };
  let pp = product.price || [-1, -1];
  return (
    <>
      <Link className="productcard" to={`/product/${product._id}`}>
        <div className="img">
          <img
            src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/q/2/i/m-s-r-b-w-farbot-original-imagjuxy9kn5qyam.jpeg?q=70"
            alt={product.name}
          />
        </div>
        <div className="pc-name-qty">
          <div className="pc-name">{product.name}</div>
          <div className="pc-qty">{product.Quantity}</div>
        </div>
        <div style={{ paddingLeft: "1vmin" }}>
          <ReactStars {...options} />
        </div>
        <span className="numrev">({product.numofReviews} Reviews)</span>
        <div className="pc-price">
          <p
            style={{
              fontSize: "1.9vmax",
              marginLeft: "1vmin",
              display: "inline-block",
            }}
          >{`₹${pp[0]}`}</p>
          <p
            style={{
              marginLeft: "1.5vmin",
              color: "grey",
              display: "inline-block",
            }}
          >
            M.R.P: <del>{product.MRP}</del>
          </p>
        </div>
        <div className="discount-box">{`${Math.round(
          100 - (pp[0] / product.MRP) * 100
        )}% off`}</div>
      </Link>
    </>
  );
};

export default Product;
