import React, { useEffect } from "react";
import "./order.css";
import CardItemCard from "./CartItemCard.js";
import { addItemToCart, removeCartItem } from "../../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import empty from "../../../images/Cart-empty.gif";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  const { cart } = useSelector((state) => state);
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    console.log(newQty);
    if (newQty > stock || newQty > 15) return;
    dispatch(addItemToCart(userId, id, newQty));
  };
  const decreaseQty = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (newQty < 1) return;
    dispatch(addItemToCart(userId, id, newQty));
  };

  let userId = user.user.user?._id || user.user?._id || user?._id;
  userId = userId?.toString();
  const cartItems = cart[userId]?.cartItems || [];

  const checkOutHandler = () => {
    navigate("/shipping");
  };
  return (
    <>
      {cartItems?.length === 0 ? (
        <div
          className="cartpage"
          style={{
            width: "100vw",
            minHeight: "100vh",
            height: "fit-content",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <img src={empty} alt="" />
            <div className="beauty">Your Cart is Empty</div>
            <Link
              to="/products"
              style={{
                textAlign: "center",
                display: "block",
                margin: "0.8vmax",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div
            className="cartpage"
            style={{
              backgroundColor: "white",
              width: "100vw",
              minHeight: "100vh",
              height: "fit-content",
            }}
          >
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems[0] &&
              cartItems.map((item) => (
                <div
                  className="cartContainer"
                  key={item.product}
                  style={{ backgroundColor: "white" }}
                >
                  <CardItemCard item={item} removeCartItem={removeCartItem} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      -
                    </button>
                    <input type="text" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cardSubTotal">{`₹${
                    item.price[0] * item.quantity
                  }`}</p>
                </div>
              ))}

            <div
              className="cartGrossTotal"
              style={{
                position: "fixed",
                right: "2vmax",
                top: "17vmax",
              }}
            >
              <div></div>
              <div className="cartGrossTotalBox">
                <div style={{ marginBottom: "0" }}>
                  <p>Gross Total</p>
                  <p>{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price[0],
                    0
                  )}`}</p>
                </div>
                <div
                  style={{
                    border: "none",
                    marginTop: "0",
                    marginBottom: "0",
                    padding: "0",
                  }}
                >
                  <p>Delivery Charges</p>
                  <p>{`+${
                    cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price[0],
                      0
                    ) > 500
                      ? 10
                      : 18
                  }`}</p>
                </div>
                <div style={{ borderTop: "1px ridge black" }}>
                  <p>Payable Amount</p>
                  <p style={{ color: "red", fontWeight: "bold" }}>{`₹${
                    cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price[0],
                      0
                    ) +
                    (cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price[0],
                      0
                    ) > 500
                      ? 10
                      : 18)
                  }`}</p>
                </div>
              </div>

              <div></div>
              <div className="checkoutbtn">
                <button
                  id="checkOut"
                  style={{ border: "0.3vmin solid black" }}
                  onClick={checkOutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
