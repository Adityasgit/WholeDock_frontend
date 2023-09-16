import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../../actions/orderAction";
import { clearErrors } from "../../../actions/productAction";
import Loader from "../utils/Loader";
import { Typography } from "@mui/material";
import "./order.css";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false || !isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);
  const address =
    order &&
    `${order.shippingInfo.address} ${
      order.shippingInfo.landmark ? order.shippingInfo.landmark : ""
    }, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${
      order.shippingInfo.pinCode
    }, India`;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="page">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                marginTop: "9vmax",
              }}
            >
              <div
                className="orderdetailscontainer"
                style={{
                  height: "fit-content",
                  width: "100%",
                }}
              >
                <Typography
                  component="h1"
                  style={{
                    position: "fixed",
                    width: "100vw",
                    backgroundColor: "white",
                    padding: "1vmax",
                    fontSize: "1.4vmax",
                    fontFamily: "cursive",
                    fontWeight: "500",
                    paddingTop: "4vmax",
                    top: "6vmax",
                  }}
                >
                  Order#{order && order._id}
                </Typography>
                <Typography
                  style={{
                    marginTop: "4vmax",
                    font: "400 1.6vmax cursive",
                    width: "70%",
                  }}
                >
                  Shipping Info
                </Typography>
                <div className="orderDetailsInnerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      +91 {order.shippingInfo && order.shippingInfo.phoneNumber}
                    </span>
                  </div>
                  <div>
                    {" "}
                    <p>Address:</p>
                    <span>{order.shippingInfo && address}</span>
                  </div>
                </div>
                <Typography
                  style={{
                    font: "400 1.6vmax cursive",
                    width: "70%",
                  }}
                >
                  Payment
                </Typography>
                <div className="orderDetailspaymentbox">
                  <div>
                    <p>Status:</p>
                    <span
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "Paid"
                        : "Pending"}
                    </span>
                  </div>
                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
                <Typography
                  style={{
                    font: "400 1.6vmax cursive",
                    width: "70%",
                  }}
                >
                  Order Status
                </Typography>
                <div className="orderDetails3rdbox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                      style={{
                        fontSize: "1.5vmax",
                        fontWeight: "700",
                        margin: "1vmax",
                      }}
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="orderdetailsCartitemsContainer">
                <Typography
                  style={{
                    font: "400 1.8vmax cursive",
                    width: "70%",
                  }}
                >
                  Order Items
                </Typography>
                <div className="orderdetailsCartitemscontainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img
                          src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/q/2/i/m-s-r-b-w-farbot-original-imagjuxy9kn5qyam.jpeg?q=70"
                          alt={item.name}
                          style={{ width: "4vmax" }}
                        />
                        <Link to={`/product/${item.product}`}>
                          {item.name.length > 15
                            ? item.name.slice(0, 15)
                            : item.name}{" "}
                          {item.name.length > 15 && "..."}
                        </Link>
                        <span>
                          {item.quantity} X {item.price[0]} ={" "}
                          <b>₹{item.price[0] * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
