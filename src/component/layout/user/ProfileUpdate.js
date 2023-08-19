import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  clearErrors,
  loadUser,
} from "../../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const initialAvatarUrl = user && user.avatar ? user.avatar.url : "";
  const [avatar, setAvatar] = useState(initialAvatarUrl);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission
  const UpdateSubmit = (e) => {
    e.preventDefault();
    const Myform = new FormData();
    Myform.append("name", name);
    Myform.append("email", email);
    Myform.append("avatar", avatar);
    dispatch(updateProfile(Myform));
  };

  // Handle avatar file change
  async function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (file) {
      try {
        const avatarDataURL = await readFileAsDataURL(file);
        setAvatarPreview(avatarDataURL);
      } catch (error) {
        console.error("Error reading avatar file:", error);
      }
      setAvatar(file);
    }
  }

  // Read file as data URL
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (event) => {
        reject(event.target.error);
      };

      reader.readAsDataURL(file);
    });
  }
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (user?.avatar) {
      setAvatarPreview(user.avatar.url);
    }
  }, []);
  // Update user profile and handle success/error
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (user.user || user) {
      setName(user.user?.name || user.name);
      setEmail(user.user?.email || user.email);
    }
    if (user.user?.avatar || user?.avatar) {
      setAvatarPreview(user.user?.avatar.url || user.avatar.url);
    }
    if (isUpdated) {
      alert("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, navigate, user, isUpdated, error]);

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
            onSubmit={UpdateSubmit}
            className="signupform"
            style={{ marginTop: "11vmax" }}
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
            <input type="submit" value="Update" className="button-30" />
          </form>
        </div>
      )}
    </>
  );
};

export default ProfileUpdate;
