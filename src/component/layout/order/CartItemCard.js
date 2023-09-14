import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, removeCartItem }) => {
  const dispatch = useDispatch();

  return (
    <div className="cardItem">
      <img src={item.image} alt={item.name} />
      <div className="">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price[0]}`}</span>
        <p onClick={() => dispatch(removeCartItem(item.product))}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
