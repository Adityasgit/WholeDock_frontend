import React, { useEffect, useState } from "react";
import "../user/login.css";
import { useNavigate } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { BsCheckAll } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Loader from "../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  clearErrors,
  loadUser,
} from "../../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const changeSubmit = (e) => {
    e.preventDefault();
    let Myform = {
      oldPassword: oldpassword,
      newPassword: newpassword,
      confirmPassword: confirmpassword,
    };

    dispatch(updatePassword(Myform));
  };
  const navigate = useNavigate();
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
    if (isUpdated) {
      alert("updated successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              {oldpassword === "" ? <VpnKeyIcon /> : <VpnKeyIcon />}
              <input
                placeholder="Old Password"
                type="password"
                name="Oldpassword"
                required
                id="Oldpassword"
                value={oldpassword}
                onChange={(e) => {
                  setOldpassword(e.target.value);
                }}
              />
            </div>{" "}
            <div className="registerpass">
              {newpassword === "" ? <LockOpenIcon /> : <LockIcon />}
              <input
                placeholder="New Password"
                type="password"
                name="password"
                required
                id="registerpassword"
                value={newpassword}
                onChange={(e) => {
                  setNewpassword(e.target.value);
                }}
              />
            </div>{" "}
            <div className="registerpass">
              {confirmpassword === newpassword && newpassword !== "" ? (
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

export default PasswordUpdate;
