import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, removeCartItem, userId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="cardItem">
      <img src={item.image} alt={item.name} />
      <div className="">
        <Link to={`/product/${item.product}`}>
          {item.name.slice(0, 15)}
          {item.name.length > 15 ? "..." : ""}
        </Link>
        <span>{`Price: ₹${item.price[0]}`}</span>
        <p
          onClick={() =>
            dispatch(
              removeCartItem(
                user?.user?.user?._id || user?.user?._id,
                item.product
              )
            )
          }
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
