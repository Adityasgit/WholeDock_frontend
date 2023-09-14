import React, { useEffect } from "react";
import { CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div className="page">
        <div
          className="ordersuccess"
          style={{
            textAlign: "center",
            padding: "10vmax",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckCircle style={{ fontSize: "7vmax", color: "green" }} />
          <Typography style={{ fontSize: "2vmax" }}>
            Your order has been Placed successfully
          </Typography>
          <Link
            to="/orders"
            style={{
              backgroundColor: "grey",
              color: "white",
              margin: "2vmax",
              border: "none",
              padding: "1vmax 3vmax",
              cursor: "pointer",
              font: "400 1.2vmax `Roboto`",
              textDecoration: "none",
            }}
          >
            View Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
