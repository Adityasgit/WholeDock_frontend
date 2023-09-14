import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { myOrders } from "../../../actions/orderAction";
import { clearErrors } from "../../../actions/productAction";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../utils/Loader";
import { Launch } from "@mui/icons-material";
import { Typography } from "@mui/material";
const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  let { user } = useSelector((state) => state.user);
  user = user.user;
  const { isAuthenticated } = useSelector((state) => state.user);
  const cols = [
    { field: "id", headerName: "Order Id", minWidth: 200, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      headerName: "Details",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="page">
            <div
              className="datagrid"
              style={{ width: "80%", paddingTop: "4vmax", maxHeight: "80%" }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1vmax",
                  backgroundColor: "black",
                  color: "white",
                  font: "400 1.5vamx cursive",
                  fontSize: "1.5vmax",
                  fontStyle: "'cursive'",
                  fontWeight: "400",
                  textShadow: "1px 1px silver",
                }}
              >
                {user.name}'s Orders
              </Typography>

              <DataGrid
                rows={rows}
                columns={cols}
                pageSizeOptions={5}
                pagination={5}
                disableRowSelectionOnClick
                disableVirtualization
                style={{ height: "70vh" }}
                autoHeight
                getRowId={(row) => row.status + "-" + row.amount}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
