import React, { useEffect, useState } from "react";
import "../user/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginimg from "../../../images/login.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "../utils/Loader";
import profilePng from "../../../images/profilepng.png";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors, register } from "../../../actions/userAction";
import { render } from "react-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [tab, setTab] = useState("login");
  const [img, setImg] = useState(false);
  const [text, setText] = useState(false);
  const [text2, setText2] = useState(false);
  const [blink, setBlink] = useState(false);
  const [loginemail, setLoginemail] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(profilePng);
  const [avatarPreview, setAvatarPreview] = useState(profilePng);
  const { name, email, password } = user;

  // Function to handle login form submission
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginemail, loginpassword));

    if (isAuthenticated === true) {
      navigate(redirect);
    }
  };

  // Function to handle sign up form submission
  const signUpSubmit = (e) => {
    e.preventDefault();
    const Myform = new FormData();
    Myform.append("name", name);
    Myform.append("email", email);
    Myform.append("password", password);
    Myform.append("avatar", avatar);
    dispatch(register(Myform));
  };

  // Function to handle avatar file change
  async function handleAvatarChange(e) {
    if (e?.target?.name === "avatar") {
      const file = e.target.files[0];

      if (file) {
        try {
          const reader = new FileReader();

          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatar(reader.result);
              setAvatarPreview(reader.result);
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error reading avatar file:", error);
        }
      }
    }
  }

  // Function to handle input changes in sign up form
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Redirect path after successful login/signup
  const redirect = "/account";

  useEffect(() => {
    // Handle errors
    if (error) {
      alert(error + error?.path);
      dispatch(clearErrors());
      setLoginemail("");
      setLoginpassword("");
      setUser({
        name: "",
        email: "",
        password: "",
      });
      setAvatar(profilePng);
      setAvatarPreview(profilePng);
    }

    // Redirect to account page after successful login
    if (isAuthenticated === true) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  useEffect(() => {
    // Delayed animations
    setTimeout(() => {
      setImg(true);
    }, 500);
    setTimeout(() => {
      setText(true);
    }, 600);
    setTimeout(() => {
      setText2(true);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="loginsignup"
            style={{
              marginTop: "6vmax",
              height: "calc(100vh - 6vmax)",
              width: "100vw",
              backgroundColor: "#e4f1f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 1s linear",
            }}
          >
            {img && (
              <div
                className="img slidein opa"
                style={{ transition: "all 1s linear" }}
              >
                <img src={loginimg} alt="loginimg" />
              </div>
            )}
            {text && (
              <div
                className="rtl"
                style={{
                  position: "absolute",
                  top: "10vmax",
                  left: "2vmax",
                  fontSize: "3.5vmax",
                  color: "#a64bb8",
                  fontWeight: "900",
                  overflow: "hidden",
                  transition: "all 0.3s linear",
                  WebkitTextStroke: "5px purple",
                }}
              >
                W E L C O M E <br /> T O
              </div>
            )}
            {text2 && (
              <div
                style={{
                  position: "absolute",
                  top: "22vmax",
                  display: "flex",
                  flexDirection: "row",
                  left: "3vmax",
                }}
              >
                <div
                  style={{
                    fontSize: "4vmax",
                    fontWeight: "600",
                    margin: "1vmax",
                    textShadow: "-2vmax 1vmax green",
                  }}
                >
                  <div className="up">
                    O <br />U <br />R
                  </div>
                </div>
                <div style={{ fontWeight: "600", fontSize: "2.5vmin" }}>
                  <div className="up">
                    E <br />~<br />S <br />T <br />O <br />R <br /> E <br />
                  </div>
                </div>
              </div>
            )}
            <div
              className="box slidein"
              style={
                img
                  ? { position: "relative", left: "2vmax" }
                  : { position: "relative", left: "0" }
              }
            >
              <div
                className="changeTab"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div className="login" onClick={() => setTab("login")}>
                  Login
                </div>
                <div className="signup" onClick={() => setTab("signup")}>
                  Sign up
                </div>
                <div
                  className="absolute"
                  style={
                    tab === "login"
                      ? { transform: "translate(-80%,-3vmin)" }
                      : { transform: "translate(80%,-3vmin)" }
                  }
                ></div>
              </div>
              <div
                className="logintab"
                style={
                  tab === "login"
                    ? {
                        width: "100%",
                        height: "80%",
                        transform: "translateX(0)",
                      }
                    : {
                        transform: "translateX(-100vmax)",
                        height: "0",
                        width: "0",
                      }
                }
              >
                <form onSubmit={loginSubmit} className="loginform">
                  <div className="loginemail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      name="loginemail"
                      id="loginemail"
                      placeholder="Email"
                      required
                      value={loginemail}
                      onChange={(e) => setLoginemail(e.target.value)}
                    />
                  </div>
                  <div className="loginpassword">
                    {loginpassword === "" ? (
                      <LockOpenIcon />
                    ) : (
                      <LockIcon
                        style={
                          blink
                            ? {
                                animation: "pop 0.2s ease-in-out",
                              }
                            : {}
                        }
                      />
                    )}
                    <input
                      type="password"
                      name="loginpass"
                      id="loginpass"
                      placeholder="Password"
                      required
                      value={loginpassword}
                      onChange={(e) => {
                        setLoginpassword(e.target.value);
                        setBlink(true);
                        setTimeout(() => {
                          setBlink(false);
                        }, 200);
                      }}
                    />
                  </div>
                  <Link to="/password/forgot" className="Link">
                    Forgot password ?
                  </Link>
                  <input type="submit" value="Login" class="button-30" />
                </form>
              </div>
              <div
                className="signuptab"
                style={
                  tab === "signup"
                    ? {
                        width: "100%",
                        height: "80%",
                        transform: "translateX(0)",
                      }
                    : {
                        transform: "translateX(100vmax)",
                        height: "0",
                        width: "0",
                      }
                }
              >
                <form
                  onSubmit={signUpSubmit}
                  className="signupform"
                  encType="multipart/form-data"
                >
                  <div className="registername">
                    <FaceIcon />
                    <input
                      placeholder="Name"
                      type="text"
                      name="name"
                      id="registername"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="registeremail">
                    <MailOutlineIcon />
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      required
                      id="registeremail"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="registerpass">
                    {user.password === "" ? (
                      <LockOpenIcon />
                    ) : (
                      <LockIcon
                        style={
                          blink
                            ? {
                                animation: "pop 0.2s ease-in-out",
                              }
                            : {}
                        }
                      />
                    )}
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      required
                      id="registerpassword"
                      value={user.password}
                      onChange={(e) => {
                        registerDataChange(e);
                        setBlink(true);
                        setTimeout(() => {
                          setBlink(false);
                        }, 200);
                      }}
                    />
                  </div>
                  <div className="registerImage">
                    <img src={avatarPreview} alt="Default" />
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <input type="submit" value="Sign Up" class="button-30" />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
