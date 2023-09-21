import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../../actions/productAction";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../utils/Loader";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import "./Admin.css";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
const AdminProducts = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, products, loading } = useSelector((state) => state.products);
  const {
    error: deleteError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.product);
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
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, isDeleted, navigate, deleteError]);

  useEffect(() => {
    if (user.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);

  const cols = [
    { field: "id", headerName: "Product ID", minwidth: 150, flex: 0.5 },
    { field: "name", headerName: "Name", minwidth: 100, flex: 0.5 },
    {
      field: "priority",
      headerName: "Priority",
      minwidth: 100,
      flex: 0.3,
      type: "number",
    },
    {
      field: "stock",
      headerName: "Stock",
      minwidth: 100,
      flex: 0.3,
      type: "number",
    },
    {
      field: "reseller",
      headerName: "Reseller",
      minwidth: 100,
      flex: 0.3,
      type: "number",
    },
    {
      field: "customer",
      headerName: "Customer",
      minwidth: 100,
      flex: 0.3,
      type: "number",
    },
    {
      field: "MRP",
      headerName: "MRP",
      minwidth: 100,
      flex: 0.3,
      type: "number",
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
                <Link to={`/admin/product/${params.row.id}`}>
                  <Edit />
                </Link>
                <Button
                  disabled={deleteLoading === true}
                  onClick={() => {
                    deleteProductHandler(params.row.id);
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        priority: item.priority,
        MRP: item.MRP,
        stock: item.stock,
        reseller: item.price[0],
        customer: item.price[1],
      });
    });
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
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
                  ALL PRODUCTS
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminProducts;
