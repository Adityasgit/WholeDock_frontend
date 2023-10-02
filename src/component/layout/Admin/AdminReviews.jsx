import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
} from "../../../actions/productAction";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../utils/Loader";
import { Delete, Star } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import "./Admin.css";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";
const AdminReviews = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    error: deleteError,
    isDeleted,
    loading: deleteLoading,
  } = useSelector((state) => state.reviews);
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const dispatch = useDispatch();
  const [productid, setProductid] = useState("");
  useEffect(() => {
    if (productid.length === 24) {
      dispatch(getAllReviews(productid));
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert("Review Deleted successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, isDeleted, navigate, deleteError, productid]);
  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productid));
  };

  useEffect(() => {
    if (isAuthenticated && isAuthenticated === false) {
      navigate("/login");
    }
    if (user && user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user, isAuthenticated]);
  const cols = [
    { field: "id", headerName: "Review ID", minwidth: 150, flex: 0.5 },
    { field: "name", headerName: "Name", minwidth: 100, flex: 0.5 },
    {
      field: "comment",
      headerName: "Comment",
      minwidth: 250,
      flex: 0.3,
    },
    {
      field: "rating",
      headerName: "Rating",
      minwidth: 100,
      flex: 0.3,
      type: "number",
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
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
                <Button
                  disabled={deleteLoading === true}
                  onClick={() => {
                    deleteReviewHandler(params.row.id);
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
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });
  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productid));
  };
  return (
    <>
      {" "}
      <div
        className="page"
        style={{
          alignItems: "start",
          justifyContent: "start",
          display: "flex",
          width: "100vw",
        }}
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

          <div className="reviewlist">
            <form onSubmit={productReviewSubmitHandler} className="adminreviewform">
              <h1
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "2vmax",
                  fontFamily: "sans-serif",
                  fontWeight: "900",
                }}
              >
                ALL REVIEWS
              </h1>
              <div>
                <div>
                  <Star />
                  <input
                    type="text"
                    placeholder="Product Id"
                    required
                    value={productid}
                    onChange={(e) => setProductid(e.target.value)}
                  />
                </div>
              </div>
              <div></div>
              <Button type="submit" disabled={loading ? true : false}>
                {" "}
                Get Reviews
              </Button>
            </form>
            {loading ? (
              <Loader />
            ) : (
              <>
                {reviews && reviews.length > 0 ? (
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
                ) : (
                  <>
                    <div className="noreviewfound">
                      No Reviews Found with #{productid}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReviews;
