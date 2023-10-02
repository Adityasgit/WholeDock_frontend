import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/productAction";
import { Button } from "@mui/material";
import {
  AccountTree,
  Spellcheck,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";

import {
  getAllUsers,
  getUserDetails,
  updateUser,
} from "../../../actions/userAction";

const UpdateUser = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const {
    // loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.users);
  const {
    loading,
    error,
    user: userDetails,
  } = useSelector((state) => state.userDetails);
  useEffect(() => {
    if (isAuthenticated && isAuthenticated === false) {
      navigate("/login");
    }
    if (user && user.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, isAuthenticated, user]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (userDetails && userDetails._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
      setRole(userDetails.role);
    }
    if (isUpdated) {
      alert("User Updated successfully");
      dispatch(getAllUsers());
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, updateError, userDetails, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.append("name", name);
    myform.append("email", email);
    myform.append("role", role);

    dispatch(updateUser(userId, myform));
  };
  const roles = ["admin", "user", "reseller"];
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
          <div className="newproductcontainer">
            <h1
              style={{
                textAlign: "center",
                width: "100%",
                padding: "2vmax",
                fontFamily: "sans-serif",
                fontWeight: "900",
              }}
            >
              UPDATE USER
            </h1>
            <form onSubmit={updateUserSubmitHandler}>
              <div>
                <div>
                  <Spellcheck />
                  <input
                    type="text"
                    placeholder="User Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <ProductionQuantityLimits />
                  <input
                    type="text"
                    placeholder="User Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <AccountTree />
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value="">Choose Role</option>
                    {roles.map((i, o) => (
                      <option key={o} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button type="submit" disabled={loading ? true : false}>
                {" "}
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
