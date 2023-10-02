import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import "./order.css";
const ConfirmOrder = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state);
  const userId = user?.user?._id;
  const { shippingInfo } = cart;
  const { cartItems } = cart[userId];
  const proceedtopaymenthandler = (e) => {
    e.preventDefault();
    const data = { subTotal, shippingCharges, gst, total };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  const subTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (user?.user?.role === "user" ? item.price[1] : item.price[0]) *
        item.quantity,
    0
  );
  const shippingCharges = subTotal > 500 ? 10 : 18;
  const gst = 0;

  const total = shippingCharges + subTotal;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, India`;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <CheckoutSteps activeStep={1} />
      <div
        className="confirmOrderPage"
        style={{
          width: "100vw",
          height: "calc(100vh - 7vmax)",
        }}
      >
        <div
          className="outer"
          style={{
            display: "flex",
            marginTop: "7vmax",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            className="confirmOrderbox"
            style={{
              width: "52%",
              margin: "1vmax",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
            }}
          >
            <div
              className="item"
              style={{
                width: "100%",
                height: "40%",
                maxHeight: "40%",
                // overflowY: "scroll",
                padding: "1vmax",
                borderBottom: "1px solid grey",
              }}
            >
              <Typography
                style={{
                  fontWeight: "600",
                  fontSize: "2vmax",
                  marginBottom: "1vmin",
                }}
              >
                Cart Items
              </Typography>
              <div className="confirmcartitems">
                {cartItems &&
                  cartItems.map((item) => (
                    <div className="cscartitems" key={item.product}>
                      <div className="img">
                        <img
                          src="https://th.bing.com/th/id/OIP.obi3X73hahF9hBFIWf53nAHaJM?w=143&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
                          alt={`name:${item.name}`}
                        />
                      </div>
                      <div className="csciitemds">
                        <Link
                          to={`/product/${item.product}`}
                          style={{ textDecoration: "none" }}
                        >
                          {item.name.slice(0, 15)}
                          {item.name.length > 15 ? `...` : ""}
                        </Link>
                        <span>
                          {item.quantity} X ₹
                          {user?.user?.role === "user"
                            ? item.price[1]
                            : item.price[0]}{" "}
                          ={" "}
                          <b>
                            ₹
                            {item.quantity *
                              (user?.user?.role === "user"
                                ? item.price[1]
                                : item.price[0])}
                          </b>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className="item"
              style={{
                width: "100%",
                height: "60%",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <div
                className="info"
                style={{
                  padding: "1vmax",
                  width: "50%",
                  height: "100%",
                  overflowY: "scroll",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "2vmax",
                    marginBottom: "1vmin",
                  }}
                >
                  Shipping Info
                </Typography>
                <div>
                  <p>Name</p>
                  <p>:</p>
                  <span>{user.user.name}</span>
                </div>
                <div>
                  <p>Phone No</p>
                  <p>:</p>
                  <span>{shippingInfo.phone}</span>
                </div>
                <div>
                  <p>Address</p>
                  <p>:</p>
                </div>
                <span
                  style={{
                    wordWrap: "break-word",
                    overflow: "scroll",
                    maxWidth: "100%",
                    color: "grey",
                    font: "300 1.2vmax cursive",
                    width: "90%",
                    margin: "auto",
                  }}
                >
                  {address}
                </span>
              </div>
              <div
                className="amount"
                style={{
                  padding: "1vmax",
                  width: "50%",
                  height: "100%",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "2vmax",
                    marginBottom: "1vmin",
                  }}
                >
                  Order Summary
                </Typography>
                <div
                  className="osmain"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto",
                    gridTemplateRows: "auto",
                  }}
                >
                  <div>
                    <p>Sub-Total</p>
                    <p>:</p>
                    <span>₹{subTotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges</p>
                    <p>:</p>
                    <span>₹{shippingCharges}</span>
                  </div>
                  <div>
                    <p>GST</p>
                    <p>:</p>
                    <span>₹{gst}</span>
                  </div>
                </div>
                <div className="ostotal">
                  <p>
                    <b>Total</b>
                  </p>
                  <b>:</b>
                  <b>{total}</b>
                </div>
                <button id="osbutton" onClick={proceedtopaymenthandler}>
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
