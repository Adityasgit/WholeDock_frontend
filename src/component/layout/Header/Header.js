import React, { Fragment, useContext } from "react";
import Navbar from "../Header/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import ButtonContext from "../../../context/ButtonContext";
const Header = (props) => {
  let screenSize = window.innerWidth;
  const btncontext = useContext(ButtonContext);
  return (
    <Fragment>
      {screenSize <= 800 ? (
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
              <GiHamburgerMenu
                style={
                  !btncontext.burger ? { color: "black" } : { color: "white" }
                }
              />
            </button>
          </div>
          <Navbar BrandName={props.BrandName} />
        </>
      ) : (
        screenSize > 800 && <Navbar BrandName={props.BrandName} />
      )}
    </Fragment>
  );
};

export default Header;
