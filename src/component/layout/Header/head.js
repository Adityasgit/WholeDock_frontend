import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Header.css";
const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>WELCOME TO NANDI's E-STORE</p>
        <h2>Find Wholesale Prices Below</h2>
        <a href="#sc">
          <button style={{ fontFamily: "monospace" }}>
            Continue Shopping
            <CgMouse />
          </button>
        </a>
      </div>
    </Fragment>
  );
};

export default Home;
