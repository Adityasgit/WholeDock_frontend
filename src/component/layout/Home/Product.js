import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

const Product = ({ product }) => {
  const { user } = useSelector((state) => state.user);
  console.log(product);
  const { ratings, images, name, Quantity, numofReviews, price, MRP } = product;
  const pp = price || [-1, -1];
  const options = {
    size: "small",
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productcard" to={`/product/${product._id}`}>
      <div className="img">
        <img src={images[0]?.url} alt={name} style={{ objectFit: "contain" }} />
      </div>
      <div style={{ position: "relative" }} className="pc-name-qty">
        <div className="pc-name">
          {name.slice(0, 15)}
          {name.length > 15 ? "..." : ""}
        </div>
        {user && user.user.role === "admin" && (
          <Link
            style={{
              position: "absolute",
              top: "-5px",
              right: "5px",
            }}
            to={`/admin/product/${product._id}`}
          >
            <FaEdit style={{ fontSize: "1.3rem" }} />
          </Link>
        )}
        <div className="pc-qty">{Quantity}</div>
      </div>
      <div style={{ paddingLeft: "1vmin" }}>
        <Rating {...options} />
      </div>
      <span className="numrev">({numofReviews} Reviews)</span>
      <div className="pc-price">
        <p
          style={{
            fontSize: "1.9vmax",
            marginLeft: "1vmin",
            display: "inline-block",
          }}
        >
          ₹{user ? (user.user.role === "user" ? pp[1] : pp[0]) : pp[1]}
        </p>
        <p
          style={{
            marginLeft: "1.5vmin",
            color: "grey",
            display: "inline-block",
          }}
        >
          M.R.P: <del>{MRP}</del>
        </p>
      </div>
      <div className="discount-box">{`${Math.round(
        100 -
          ((user ? (user.user.role === "user" ? pp[1] : pp[0]) : pp[1]) / MRP) *
            100
      )}% off`}</div>
    </Link>
  );
};

export default Product;
