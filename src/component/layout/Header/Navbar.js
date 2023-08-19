import React, { Fragment, useContext, useEffect, useState } from "react";
import logo from "../../../images/logo.jpg";
import ButtonContext from "../../../context/ButtonContext";
import { FcHome, FcAbout } from "react-icons/fc";
import { FaShopify, FaSearch, FaRegWindowClose, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiCoupon2Fill } from "react-icons/ri";
import Search from "./Search";

const Navbar = (props) => {
  // State and Context
  const navigate = useNavigate();
  const {
    burger,
    search,
    setSearch,
    setBurger,
    setSort,
    setAllproducts,
    account,
    setAccount,
  } = useContext(ButtonContext);

  // Theme State and Effect
  const [theme, setTheme] = useState({
    color: "white",
    backgroundImage:
      "linear-gradient(to right, rgb(70, 20, 10), rgb(10, 30, 60))",
  });

  useEffect(() => {
    // Update theme based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setTheme({
          color: "white",
          backgroundImage:
            "linear-gradient(to left, rgb(70, 20, 10), rgb(10, 30, 60))",
        });
      } else {
        setTheme({
          color: "white",
          backgroundImage:
            "linear-gradient(to right, rgb(70, 20, 10), rgb(10, 30, 60))",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      {/* Render the navigation bar only when 'burger' state is true */}
      {burger && (
        <>
          <div id="navbar" style={theme} className="slide-in">
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
              {/* Navigation links with icons */}
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <div
                  className="items"
                  onClick={() => window.innerWidth <= 480 && setBurger(false)}
                >
                  Home
                  <p style={{ display: "block" }}>
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
                  <p style={{ display: "block" }}>
                    <FaShopify />
                  </p>
                </div>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                <div className="items">
                  Coupons
                  <p style={{ display: "block" }}>
                    <RiCoupon2Fill />
                  </p>
                </div>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <div className="items">
                  About
                  <p style={{ display: "block" }}>
                    <FcAbout />
                  </p>
                </div>
              </Link>
            </div>
            <div className="right-navbar">
              <div className="user">Account</div>
            </div>
          </div>
        </>
      )}

      {/* Render the search component when 'search' state is true */}
      {search && (
        <div className="search">
          <Search />
        </div>
      )}

      {/* Render the account component when 'account' state is true */}
      {account && <div className="account">i am account</div>}

      {/* Search icon for desktop view */}
      {window.innerWidth > 600 && (
        <div
          className="searchopen"
          style={!search ? { top: "6vmax" } : { top: "11vmax" }}
          onClick={() => {
            setSearch();
            if (!search) setSort({ val: false });
            if (!search) setAllproducts([]);
            if (!search) navigate("/products");
          }}
        >
          {!search ? <FaSearch /> : <FaRegWindowClose />}
        </div>
      )}

      {/* Account icon for desktop view */}
      {window.innerWidth > 600 && (
        <div
          className="accountopen"
          style={!account ? { top: "6vmax" } : { top: "11vmax" }}
          onClick={() => {
            setAccount();
          }}
        >
          {!account ? <FaUser /> : <FaRegWindowClose />}
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
