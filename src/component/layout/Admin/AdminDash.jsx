import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../../actions/productAction.js";
import { getAllOrders } from "../../../actions/orderAction.js";
import { getAllUsers } from "../../../actions/userAction.js";

const AdminDash = () => {
  let outofstock = 0;
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  products &&
    products.forEach((item) => {
      if (item.stock < 0) {
        outofstock += 1;
      }
    });
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user, isAuthenticated]);
  ChartJS.register(...registerables);

  const linechart = {
    labels: [`Initial Amount`, `Amount Earned`],
    datasets: [
      {
        label: `TOTAL AMOUNT`,
        backgroundColor: [`dardred`],
        hoverBackgroundColor: [`red`],
        data: [0, 4000],
      },
    ],
  };
  const dotchart = {
    labels: [`Out of Stock`, `InStock`],
    datasets: [
      {
        backgroundColor: [`red`, `green`],
        hoverBackgroundColor: [`darkred`, `darkgreen`],
        data: [outofstock, products.length - outofstock],
      },
    ],
  };
  return (
    <>
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
          <div className="dashcontainer">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashSummary">
              <div>
                <p>
                  Total Amount <br /> ₹12000
                </p>
              </div>
            </div>
            <div className="dashsummaryb2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
            <div className="linechart">
              <Line data={linechart} />
            </div>
            <div className="dotchart">
              <Doughnut data={dotchart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
