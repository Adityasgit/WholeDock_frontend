import React, { useEffect, useState } from "react";
import "./Product.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../utils/Loader";
import ReviewCard from "../Product/ReviewCard";
import { addItemToCart } from "../../../actions/cartAction";
import { newReview } from "../../../actions/productAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../../constants/productConstants";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch product details from the Redux store
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  // Fetch user details and review submission status from the Redux store
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const userId = user?.user?.user?._id || user?.user?._id;

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Increase quantity in cart
  const incQuantity = () => {
    if (quantity >= product.stock || quantity >= 15) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  // Decrease quantity in cart
  const decQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  // Toggle review submission dialog
  const submitReviewToggle = () => {
    setOpen(!open);
  };

  // Handle review submission
  const reviewSubmitHandler = () => {
    const newForm = new FormData();
    newForm.append("rating", rating);
    newForm.append("comment", comment);
    newForm.append("productId", params.id);

    dispatch(newReview(newForm));
    setOpen(false);
  };

  // Add product to cart
  const addToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(addItemToCart(userId, params.id, quantity));
    alert("Item added to cart");
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      alert(error);
      return;
    }
    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
      return;
    }
    if (success) {
      alert("review added");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error, reviewError, success]);

  const options = {
    size: "medium",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const pp = product?.price || [-1, -1];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <>
            {/* Product Details Section */}
            <div className="product-details">
              {/* Carousel for Product Images */}
              <div>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        src={item.url}
                        alt={`${i} Slide`}
                        key={item.public_id}
                      />
                    ))}
                </Carousel>
              </div>

              {/* Product Information */}
              <div>
                <div className="detail-1" style={{ width: "100%" }}>
                  <h2
                    style={{
                      overflowY: "scroll",
                      wordWrap: "break-word",
                      maxHeight: "16vmax",
                      width: "100%",
                      paddingTop: "7vmax",
                    }}
                  >
                    {product.name}
                  </h2>
                  <h2>
                    <p>{product.Quantity}</p>
                  </h2>

                  <div className="detail-1-1">Product #{product._id}</div>
                </div>

                {/* Product Rating */}
                <div className="detail-2">
                  <Rating {...options} />{" "}
                  <span style={{ font: "200 1.1vmax cursive" }}>
                    ({product.numofReviews} Reviews)
                  </span>
                </div>

                {/* Product Pricing and Add to Cart */}
                <div className="detail-3">
                  <h1>
                    ₹
                    {user
                      ? user?.user?.role === "user"
                        ? pp[1]
                        : pp[0]
                      : pp[1]}
                    <span>
                      M.R.P: <del>{product.MRP}</del>
                    </span>
                  </h1>

                  <div className="detail-3-1">
                    <div className="detail-3-1-1">
                      <button onClick={decQuantity}>-</button>
                      <input type="number" value={quantity} readOnly />
                      <button onClick={incQuantity}>+</button>
                    </div>
                    <button disabled={product.stock < 1} onClick={addToCart}>
                      Add to Cart
                    </button>
                  </div>
                  <p>
                    Status:
                    <b
                      style={
                        product.stock > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {product.stock > 0 ? " In Stock" : " Out of Stock"}
                    </b>
                  </p>
                </div>

                {/* Submit Review Button */}
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit a Review
                </button>
              </div>
            </div>

            {/* Product Description */}
            <fieldset>
              <legend className="des">Description:</legend>
              <div className="description">
                <p>
                  {product.description}
                  <br />
                </p>
              </div>
              <h4>Expiring on: {product.ExpiresOn}</h4>
            </fieldset>

            {/* Reviews Section */}
            <div className="re">Reviews</div>

            {/* Review Submission Dialog */}
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Rating
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  value={rating}
                  size="large"
                />
                <textarea
                  cols="30"
                  rows="5"
                  value={comment}
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.082)",
                    margin: "1vmax 0",
                    outline: "none",
                    padding: "1rem",
                    font: "300 1rem 'Roboto'",
                  }}
                  onChange={(e) => setComment(e.target.value)}
                />
                <DialogActions>
                  <Button onClick={submitReviewToggle} style={{ color: "red" }}>
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>

            {/* Reviews */}
            <div className="reviews">
              {product.reviews && product.reviews[0] ? (
                product.reviews.map((review) => <ReviewCard review={review} />)
              ) : (
                <div className="noreview">No Reviews Yet</div>
              )}
            </div>
          </>
        )
      )}
    </>
  );
};

export default ProductDetails;
