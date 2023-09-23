import React, { useEffect, useState } from "react";
import "../user/login.css";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckAll } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Loader from "../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../../actions/userAction";

const ResetPassword = () => {
  // Initialize state and dispatch
  const [password, setpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // Extract data from Redux store
  const { success, error, loading } = useSelector(
    (state) => state.forgotPassword
  );

  // Handle form submission
  const changeSubmit = (e) => {
    e.preventDefault();
    let Myform = {
      password,
      confirmpassword,
    };

    dispatch(resetPassword(params.token, Myform));
  };

  useEffect(() => {
    // Handle error message and clear errors
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    // Notify user on successful password update
    if (success) {
      alert("Password updated successfully");
      navigate("/login");
    }
  }, [error, success, navigate, dispatch]);

  return (
    <>
      {loading ? (
        // Show loader while waiting for the operation to complete
        <Loader />
      ) : (
        // Render form when not loading
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            width: "30%",
            margin: "auto",
          }}
        >
          <form
            onSubmit={changeSubmit}
            className="signupform"
            style={{ marginTop: "11vmax" }}
            encType="application/json"
          >
            <div className="registerpass">
              {password === "" ? <LockOpenIcon /> : <LockIcon />}
              <input
                placeholder="New Password"
                type="password"
                name="password"
                required
                id="registerpassword"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>{" "}
            <div className="registerpass">
              {confirmpassword === password && password !== "" ? (
                <BsCheckAll />
              ) : (
                <RxCross2 />
              )}
              <input
                placeholder="Confirm Password"
                type="password"
                name="password"
                required
                id="registerpassword"
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                }}
              />
            </div>
            <input type="submit" value="Change" className="button-30" />
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
