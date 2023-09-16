import React, { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import profilePng from "../../../images/profilepng.png";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitIcon from "@mui/icons-material/ExitToApp";
import ListIcon from "@mui/icons-material/ListAlt";
import CartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../actions/userAction";
import { Backdrop } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../utils/Loader";
const UserOptions = ({ user }) => {
  const { loading } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state);
  let userId = user.user?._id;
  const cartItems = cart[userId]?.cartItems || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [actions, setActions] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const dashboard = () => {
      navigate("/admin/dashboard");
    };
    const orders = () => {
      navigate("/orders");
    };
    const account = () => {
      navigate("/account");
    };
    const cart = () => {
      navigate("/cart");
    };
    const logoutUser = () => {
      dispatch(logOut());
      navigate("/");
      alert("Logged out successfully");
    };
    let newActions = [
      { icon: <ListIcon />, name: "Orders", func: orders },
      {
        icon: (
          <CartIcon
            style={
              cartItems?.length > 0 ? { color: "purple" } : { color: "unset" }
            }
          />
        ),
        name: `Cart(${cartItems?.length})`,
        func: cart,
      },
      { icon: <PersonIcon />, name: "Account", func: account },
      { icon: <ExitIcon />, name: "LogOut", func: logoutUser },
    ];

    if (user?.user?.role === "admin" || user.role === "admin") {
      newActions.unshift({
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      });
    }

    setActions(newActions);
  }, [user, dispatch, navigate, cartItems]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Backdrop open={open} style={{ zIndex: "11" }} />
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            className="speedDial"
            icon={
              <div className="divofIcon">
                <img
                  src={
                    user?.user?.avatar.url || user?.avatar.url
                      ? user?.user?.avatar.url || user?.avatar.url
                      : profilePng
                  }
                  alt="photu"
                  className="speedDialIcon"
                  style={{ objectFit: "cover" }}
                />
              </div>
            }
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen={window.innerWidth <= 600}
                onClick={action.func}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </>
  );
};

export default UserOptions;
