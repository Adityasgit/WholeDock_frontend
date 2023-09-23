import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/productAction";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../utils/Loader";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import "./Admin.css";
import { deleteOrder, getAllOrders } from "../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
const AdminOrders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const {
    error: deleteError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert("Deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, isDeleted, navigate, deleteError]);

  useEffect(() => {
    if (isAuthenticated && isAuthenticated === false) {
      navigate("/login");
    }
    if (user && user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user, isAuthenticated]);

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
      field: "action",
      headerName: "Action",
      minwidth: 270,
      flex: 0.3,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <>
            {!deleteLoading === true ? (
              <>
                <Link to={`/admin/order/${params.row.id}`}>
                  <Edit />
                </Link>
                <Button
                  disabled={deleteLoading === true}
                  onClick={() => {
                    deleteOrderHandler(params.row.id);
                  }}
                >
                  <Delete />
                </Button>
              </>
            ) : (
              <>...</>
            )}
          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  return (
    <>
      {" "}
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
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="productListContainer">
                <h1
                  style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "2vmax",
                    fontFamily: "sans-serif",
                    fontWeight: "900",
                  }}
                >
                  ALL ORDERS
                </h1>

                <DataGrid
                  rows={rows}
                  columns={cols}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                  style={{ minHeight: "70vh", width: "99%", margin: "auto" }}
                  autoHeight
                  getRowId={(row) => row.id + "-" + row.MRP}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
