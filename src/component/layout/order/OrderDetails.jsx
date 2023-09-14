import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../../actions/orderAction";
import { clearErrors } from "../../../actions/productAction";
import Loader from "../utils/Loader";
import { Typography } from "@mui/material";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
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
    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, India`;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="page">
            <div
              className="orderdetailscontainer"
              style={{ height: "calc(100% - 18vmax)", width: "50%" }}
            >
              <Typography component="h1">Order#{order && order._id}</Typography>
              <Typography>Shipping Info</Typography>
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
              <Typography>Payment</Typography>
              <div className="orderDetailspaymentbox">
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
                      ? "Paid"
                      : "Pending"}
                  </p>
                </div>
                <div>
                  <p>Amount</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
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
