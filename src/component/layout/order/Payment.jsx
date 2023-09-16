import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../../actions/productAction";
import { createOrder } from "../../../actions/orderAction";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import "./payment.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearCartItems } from "../../../actions/cartAction";
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  console.log(orderInfo);
  const paybtn = useRef(null);
  const navigate = useNavigate();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state);
  const { shippingInfo } = cart;
  const cartItems = cart[user.user._id];
  const cc = cartItems.cartItems;
  const { error } = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };
  const order = {
    shippingInfo: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: "IN",
      pinCode: shippingInfo.pinCode,
      phoneNumber: shippingInfo.phone,
    },
    orderItems: cc,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.gst,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.total,
  };
  if (shippingInfo.landmark) {
    order.shippingInfo.landmark = shippingInfo.landmark;
  }
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  const paymentSubmitHandler = async (e) => {
    e.preventDefault();
    paybtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const clientSecret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.user.name,
            email: user.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: "IN",
            },
          },
        },
      });
      if (result.error) {
        paybtn.current.disabled = false;
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          dispatch(clearCartItems(user.user._id));
          navigate("/success");
        } else {
          alert("There is Some error while processig with payment");
        }
      }
    } catch (error) {
      paybtn.current.disabled = false;
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <CheckoutSteps activeStep={2} />
      <div className="paymentpage">
        <div className="paymentcontainer">
          <form
            onSubmit={(e) => paymentSubmitHandler(e)}
            className="paymentform"
          >
            <Typography
              style={{
                fontSize: "2vmax",
                color: "grey",
                borderBottom: "1px solid grey",
                padding: "1vmin",
                textAlign: "center",
              }}
            >
              Payment Type
            </Typography>
            <div>
              <CreditCard />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              <Event />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <VpnKey />
              <CardCvcElement className="paymentInput" />
            </div>
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.total}`}
              ref={paybtn}
              className="paymentformbtn"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
