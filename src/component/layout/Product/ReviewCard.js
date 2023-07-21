import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import profilepng from "../../../images/profilepng.png";
import { useSelector } from "react-redux";
const ReviewCard = ({ review }) => {
  const { loading } = useSelector((state) => state.productDetails);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value:  review.rating || 0,
    isHalf: true,
  };
  useEffect(() => {}, []);
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="rc">
          <img src={profilepng} alt="User" />
          <p>{review.name}</p>
          <ReactStars {...options} />
          <div className="cmt">{review.comment}</div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
