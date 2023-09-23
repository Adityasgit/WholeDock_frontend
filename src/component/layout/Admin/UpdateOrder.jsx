import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getOrderDetails, updateOrder } from "../../../actions/orderAction";
import { clearErrors } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/utils/Loader";
import { AccountTree } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import "./updateOrder.css";
const ProcessOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, isAuthenticated, user]);
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <div
        className="page"
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div
          style={{
            width: "100vw",
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 5fr",
            position: "absolute",
            top: "6vmax",
          }}
        >
          <Sidebar />
          <div className="dashboard">
            <div className="newProductContainer">
              {loading ? (
                <Loader />
              ) : (
                <div className="confirmOrderPage">
                  <div>
                    <div className="confirmshippingArea">
                      <Typography>Shipping Info</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <p>Name:</p>
                          <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                          <p>Phone:</p>
                          <span>
                            {order.shippingInfo &&
                              order.shippingInfo.phoneNumber}
                          </span>
                        </div>
                        <div>
                          <p>Address:</p>
                          <span>
                            {order.shippingInfo &&
                              `${order.shippingInfo.address}, ${
                                order.shippingInfo.landmark
                                  ? order.shippingInfo.landmark
                                  : ""
                              } ${order.shippingInfo.city}, ${
                                order.shippingInfo.state
                              }, ${order.shippingInfo.pinCode}, ${
                                order.shippingInfo.country
                              }`}
                          </span>
                        </div>
                      </div>

                      <Typography>Payment</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <p
                            className={
                              order.paymentInfo &&
                              order.paymentInfo.status === "succeeded"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "PAID"
                              : "NOT PAID"}
                          </p>
                        </div>

                        <div>
                          <p>Amount:</p>
                          <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                      </div>

                      <Typography>Order Status</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <p
                            className={
                              order.orderStatus &&
                              order.orderStatus === "Delivered"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {order.orderStatus && order.orderStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="confirmCartItems">
                      <Typography style={{ fontSize: "1.6vmax" }}>
                        Your Cart Items:
                      </Typography>
                      <div className="confirmCartItemsContainer">
                        {order.orderItems &&
                          order.orderItems?.map((item) => (
                            <div key={item.product}>
                              <img src={item.image} alt="Product" />
                              <Link to={`/product/${item.product}`}>
                                {item.name.length > 15
                                  ? `${item.name.slice(0, 15)}...`
                                  : item.name}
                              </Link>{" "}
                              <span>
                                {item.quantity} X ₹{item.price[0]} ={" "}
                                <b>₹{item.price[0] * item.quantity}</b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ position: "fixed", right: "9vmax", top: "40%" }}
                  >
                    <form
                      className="updateOrderForm"
                      onSubmit={updateOrderSubmitHandler}
                    >
                      <h1
                        style={{
                          font: "400 3vmax cursive",
                        }}
                      >
                        Process Order
                      </h1>
                      {order.orderStatus !== "Delivered" && (
                        <div>
                          <AccountTree />
                          <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                            {order.orderStatus === "Processing" && (
                              <>
                                <option value="Shipped">Shipped</option>
                                <option value="Cancel">Cancel</option>
                              </>
                            )}

                            {order.orderStatus === "Shipped" && (
                              <>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancel">Cancel</option>
                              </>
                            )}
                          </select>
                        </div>
                      )}
                      {order.orderStatus !== "Delivered" ? (
                        <Button
                          id="createProductBtn"
                          type="submit"
                          disabled={
                            loading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        >
                          Process
                        </Button>
                      ) : (
                        <>
                          <h5 style={{ color: "green", padding: "3vmax" }}>
                            DELIVERED SUCCESSFULLY
                          </h5>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
