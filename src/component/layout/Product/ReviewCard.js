import React, { useEffect } from "react";
import profilepng from "../../../images/profilepng.png";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
const ReviewCard = ({ review }) => {
  const { loading } = useSelector((state) => state.productDetails);
  const options = {
    size: "medium",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="rc">
          <img src={profilepng} alt="User" />
          <p>{review.name}</p>
          <Rating {...options} />
          <div className="cmt">{review.comment}</div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
