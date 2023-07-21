import React, { Fragment, useContext } from "react";
import Navbar from "../Header/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import ButtonContext from "../../../context/ButtonContext";
const Header = (props) => {
  let screenSize = window.screen.width;
  const btncontext = useContext(ButtonContext);
  return (
    <Fragment>
      {screenSize < 480 && (
        <>
          <div
            className="burger"
            style={{
              top: "0px",
              zIndex: "100",
              position: "fixed",
            }}
          >
            <button
              style={!btncontext.burger ? {} : { rotate: "90deg" }}
              onClick={() => {
                btncontext.setBurger();
              }}
            >
              <GiHamburgerMenu />
            </button>
          </div>
          <Navbar BrandName={props.BrandName} />
        </>
      )}
      {screenSize > 480 && <Navbar BrandName={props.BrandName} />}
    </Fragment>
  );
};

export default Header;
