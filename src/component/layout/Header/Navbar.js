import React, { Fragment, useContext } from "react";
import logo from "../../../images/logo.jpg";
import ButtonContext from "../../../context/ButtonContext";
import { FcHome, FcAbout } from "react-icons/fc";
import { FaShopify, FaSearch, FaRegWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiCoupon2Fill } from "react-icons/ri";
import Search from "./Search";
const Navbar = (props) => {
  const navigate = useNavigate();
  const { burger, search, setSearch, setBurger, setAllproducts } =
    useContext(ButtonContext);
  return (
    <Fragment>
      {burger && (
        <>
          <div id="navbar" style={{ zIndex: "10" }}>
            <div className="left-navbar">
              <div className="items">
                <img src={logo} alt="LOGO"></img>
              </div>
              <div
                className="items"
                style={{ letterSpacing: "4px", fontSize: "2vmax" }}
              >
                {props.BrandName}
                <p style={{ letterSpacing: "0px", fontSize: "1.5vmax" }}>
                  GEN STORE
                </p>
              </div>
            </div>
            <div className="mid-navbar">
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <div
                  className="items"
                  onClick={() => window.innerWidth <= 480 && setBurger(false)}
                >
                  {" "}
                  Home
                  <p
                    style={{
                      display: "block",
                    }}
                  >
                    <FcHome />
                  </p>
                </div>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/products"
              >
                <div
                  className="items"
                  onClick={() => window.innerWidth <= 480 && setBurger(false)}
                >
                  Products
                  <p
                    style={{
                      display: "block",
                    }}
                  >
                    <FaShopify />
                  </p>
                </div>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <div className="items">
                  Coupons
                  <p
                    style={{
                      display: "block",
                    }}
                  >
                    <RiCoupon2Fill />
                  </p>
                </div>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <div className="items">
                  {" "}
                  About
                  <p
                    style={{
                      display: "block",
                    }}
                  >
                    <FcAbout />
                  </p>
                </div>
              </Link>
            </div>
            <div className="right-navbar">
              <div className="items">
                <input type="button" value="Login" />
              </div>
              <div className="items" style={{ marginRight: "28vmax" }}>
                <input type="button" value="Signup" />
              </div>
            </div>
          </div>
        </>
      )}

      {search && (
        <div className="search">
          <Search />
        </div>
      )}
      {window.innerWidth > 600 && (
        <div
          className="searchopen"
          style={!search ? { top: "6vmax" } : { top: "11vmax" }}
          onClick={() => {
            setSearch();
            if (!search) navigate("/products");
            if (!search) setAllproducts([]);
          }}
        >
          {!search ? <FaSearch /> : <FaRegWindowClose />}
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
