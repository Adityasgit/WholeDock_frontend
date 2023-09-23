import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import profilePng from "../../../images/profilepng.png";

const Profile = () => {
  // Get user data from Redux store
  let { user, isAuthenticated, loading } = useSelector((state) => state.user);

  // Get user avatar image URL
  const img = user?.user?.avatar?.url;

  // Initialize navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (loading === false && isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, loading]);

  return (
    <>
      {loading ? (
        // Display loader while loading user data
        <Loader />
      ) : (
        <>
          <div
            className="profilemain"
            style={{
              marginTop: "8vmax",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100vw",
              height: "calc(100vh - 8vmax)",
            }}
          >
            <div className="">
              <h1>
                My Profile
                <p
                  style={{
                    fontSize: "1.5vmax",
                    fontWeight: "200",
                    color: "grey",
                  }}
                >
                  Role: {user?.user?.role}
                </p>
              </h1>

              <div
                style={{
                  overflow: "scroll",
                  borderRadius: "50%",
                  transform: "scale(1.3)",
                  transition: "all 0.3s linear",
                }}
              >
                <img
                  src={img || profilePng}
                  alt="your profileImage"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <Link className="link" to="/account/update">
                Edit Profile
              </Link>
            </div>
            <div className="detail">
              <div className="name">
                <h3>Full Name</h3>
                <p>{user?.user?.name}</p>
              </div>
              <div className="email">
                <h3>Email</h3>
                <p>{user?.user?.email}</p>
              </div>
              <div className="join">
                <h3>Joined On</h3>
                <p>{String(user?.user?.createdAt).slice(0, 10)}</p>
              </div>
              <div>
                <Link className="link" to="/orders">
                  My Orders
                </Link>
              </div>
              <div>
                <Link className="link" to="/password/update">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "3vmax",
              fontSize: "2vmax",
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Total Orders <br />
            <p style={{ color: "red", marginTop: "0.5vmax" }}>
              {user?.user?.numOfOrders}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
