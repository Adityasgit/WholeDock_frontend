import React, { useEffect } from "react";
import profilepng from "../../../images/profilepng.png";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  // Get loading state from the Redux store
  const { loading } = useSelector((state) => state.productDetails);

  // Define options for the Rating component
  const options = {
    size: "medium",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      {loading ? (
        // Display loading message if data is still loading
        "Loading"
      ) : (
        // Render review card when data is loaded
        <div className="rc">
          {/* User Profile Picture */}
          <img src={profilepng} alt="User" />

          {/* User Name */}
          <p>{review.name}</p>

          {/* Rating Component */}
          <Rating {...options} />

          {/* Review Comment */}
          <div className="cmt">{review.comment}</div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
