import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const Product = ({ product }) => {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  let pp = product?.price || [-1, -1];
  return (
    <>
      <Link className="productcard" to={`/product/${product._id}`}>
        <div className="img">
          <img
            src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/q/2/i/m-s-r-b-w-farbot-original-imagjuxy9kn5qyam.jpeg?q=70"
            alt={product.name}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="pc-name-qty">
          <div className="pc-name">
            {product.name.slice(0, 15)}
            {product.name.length > 15 ? "..." : ""}
          </div>
          <div className="pc-qty">{product.Quantity}</div>
        </div>
        <div style={{ paddingLeft: "1vmin" }}>
          <Rating {...options} />
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
