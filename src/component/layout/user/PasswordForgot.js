import React, { useEffect, useState } from "react";
import "../user/login.css";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../actions/userAction";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const PasswordForgot = () => {
  const [email, setEmail] = useState("");
  const { message, loading, error } = useSelector(
    (state) => state.forgotPassword
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forgotSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email: email }));
  };

  useEffect(() => {
    // Handle error message and clear errors
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    // Show success message on successful password reset
    if (message) {
      alert(message);
    }
  }, [dispatch, error, navigate, message]);

  return (
    <>
      {loading ? (
        // Display loader while loading
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
            onSubmit={forgotSubmit}
            className="signupform"
            style={{ marginTop: "11vmax" }}
            encType="application/json"
          >
            <div className="loginemail">
              <MailOutlineIcon />
              <input
                type="email"
                name="email"
                id="loginemail"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Forgot" className="button-30" />
          </form>
        </div>
      )}
    </>
  );
};

export default PasswordForgot;
