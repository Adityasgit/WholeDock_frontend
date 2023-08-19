import React, { useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Header.css";

const Home = () => {
  // State to control the visibility of the text
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Delay showing the text for 500ms after the component mounts
    setTimeout(() => {
      setShowText(true);
    }, 500);

    // Add a scroll event listener to show the text immediately when user starts scrolling
    window.addEventListener("scroll", () => {
      setShowText(true);
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className="banner">
      {/* Show the text when 'showText' state is true */}
      <p className={showText ? "show" : ""}>WELCOME TO NANDI's E-STORE</p>
      <h2 className={showText ? "show" : ""}>Find Wholesale Prices Below</h2>
      <a href="#sc">
        <button
          style={{ fontFamily: "monospace" }}
          className={showText ? "show" : ""}
        >
          Continue Shopping <CgMouse />
        </button>
      </a>
    </div>
  );
};

export default Home;
