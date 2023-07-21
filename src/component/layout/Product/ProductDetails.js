import React, { useEffect } from "react";
import "./Product.css";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../utils/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../Product/ReviewCard";
const ProductDetails = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      return alert(error);
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, alert, error]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 25,
    isHalf: true,
  };
  const pp = product.price || [-1, -1];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <>
            <div className="product-details">
              <div>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        src="https://m.media-amazon.com/images/I/81G4oZdPIgL._UY879_.jpg"
                        alt={`${i} Slide`}
                        key={item.id}
                      />
                    ))}
                </Carousel>
              </div>
              <div>
                <div className="detail-1">
                  <h2>
                    {product.name}
                    <p>{product.Quantity}</p>
                  </h2>

                  <div className="detail-1-1">Product #{product._id}</div>
                </div>

                <div className="detail-2">
                  <ReactStars {...options} {...{ value: product.ratings }} />{" "}
                  <span>({product.numofReviews} Reviews)</span>
                </div>
                <div className="detail-3">
                  <h1>
                    ₹{pp[0]}{" "}
                    <span>
                      M.R.P: <del>{product.MRP}</del>
                    </span>
                  </h1>

                  <div className="detail-3-1">
                    <div className="detail-3-1-1">
                      <button>-</button>
                      <input type="number" value="1" />
                      <button>+</button>
                    </div>
                    <button>Add to cart</button>
                  </div>
                  <p>
                    Status:
                    <b
                      style={
                        product.stock !== 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {product.stock !== 0 ? " In Stock" : " Out of Stock"}
                    </b>
                  </p>
                </div>
                <button className="submitReview">Submit a Review</button>
              </div>
            </div>
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
            <div className="re">Reviews</div>
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
