import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../utils/Loader";
import ProductCard from "../Home/Product";
import { clearErrors, getProducts } from "../../../actions/productAction";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonContext from "../../../context/ButtonContext";
import { useParams } from "react-router-dom";
import Slider from "@mui/material-next/Slider";
import { Typography } from "@mui/material";
import { FaStar, FaRegStar } from "react-icons/fa";

// Define star icons for ratings

// Function to display the value for Slider component
function valuetext(value) {
  return `${value}`;
}

// CSS style for the radio button
const radioStyle = {
  display: "none", // Hide the default radio button
};

// CSS style for the custom radio button (purple)
const customRadioStyle = {
  display: "inline-block",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: "2px solid purple",
  marginRight: "8px",
  position: "relative",
  top: "3px",
};
// Constants
const rightArrow = ">";
const minDistance = 150;

// Array of gender options
const genderOptions = [
  {
    label: "Men",
    value: "men",
  },
  {
    label: "Women",
    value: "women",
  },
  {
    label: "Baby",
    value: "baby",
  },
];
// Array of sort options
const sortOptions = [
  {
    label: "Relevance",
    value: "_id",
  },
  {
    label: "Popularity",
    value: "-stock",
  },
  {
    label: "Price -- Low to High",
    value: "MRP",
  },
  {
    label: "Price -- High to Low",
    value: "-MRP",
  },
  {
    label: "Newest first",
    value: "-createdAt",
  },
];

// Array of category options
const categoryOptions = [
  {
    label: "Facial and Skin Care",
    value: "Facial",
  },
  {
    label: "Body care",
    value: "Body",
  },
  {
    label: "Home essentials",
    value: "Home",
  },
  {
    label: "Others",
    value: "Other",
  },
];
const AllProducts = () => {
  // State and context variables
  const { value, setValue, category, setCategory, sort, setSort } =
    useContext(ButtonContext);
  const [rating, setRating] = useState(0);
  const [gender, setGender] = useState("");
  const [company, setCompany] = useState("");
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // Update Slider value and clear results
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
    clear();
  };

  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  // Select data from Redux store
  const { loading, products, filteredCount, productsCount, error } =
    useSelector((state) => state.products);
  const keyword = params.keyword;
  const { Allproducts, setAllproducts } = useContext(ButtonContext);

  // Clear search results
  const clear = () => {
    setAllproducts([]);
    setSort({ val: false });
    setPage(1);
  };
  // Array of rating options
  const ratingOptions = [
    {
      value: 4,
      label: <>4{rating >= 4 ? <FaStar /> : <FaRegStar />} and above</>,
    },
    {
      value: 3,
      label: <>3{rating >= 3 ? <FaStar /> : <FaRegStar />} and above</>,
    },
    {
      value: 2,
      label: <>2{rating >= 2 ? <FaStar /> : <FaRegStar />} and above</>,
    },
  ];

  // State for pagination
  const [page, setPage] = useState(1);

  // Fetch data for infinite scroll
  const fetchData = () => {
    setPage(page + 1);
  };

  // Fetch products based on filters and keyword
  useEffect(() => {
    if (error) {
      alert(error, error.path);
      dispatch(clearErrors());
    }
    dispatch(
      getProducts(sort, page, keyword, value, category, rating, gender, company)
    );
  }, [
    dispatch,
    sort,
    error,
    page,
    keyword,
    value,
    category,
    rating,
    gender,
    company,
  ]);

  // Company list
  const companies = [
    "Denver",
    "Nivea",
    "Lux",
    "Astaberry",
    "Mamaearth",
    "Ganpati",
    "Lotus",
    "Lakme",
  ];

  // Update products when new data is fetched
  useEffect(() => {
    setAllproducts([...Allproducts, ...products]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      {/* Main Content */}
      <div className="allp">
        {/* Filter bar */}
        <div className="filterbar">
          {/* Price filter */}
          <div
            style={{
              margin: "2vmax",
              fontSize: "2.2vmax",
              color: "rgba(0,0,0,0.700)",
            }}
          >
            Filters
          </div>
          <div
            className="pricefilter"
            style={{ borderBottom: "1px solid grey" }}
          >
            <Typography>Max Retail Price</Typography>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={1000}
              disableSwap
            />
            {/* Price range display */}
            <div
              className="pricenum"
              style={{ textAlign: "center", marginBottom: "1vmax" }}
            >
              <input
                type="number"
                name="from"
                id="pnum_from"
                value={value[0]}
                disabled={true}
                style={{
                  width: "5vmax",
                  textAlign: "center",
                  marginRight: "1vmax",
                }}
              />
              {"  "}
              to{"  "}
              <input
                type="number"
                name="to"
                id="pnum_to"
                value={value[1]}
                disabled={true}
                style={{
                  width: "5vmax",
                  textAlign: "center",
                  marginLeft: "1vmax",
                }}
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="category container">
            <div
              style={{
                padding: "auto",
                fontSize: "1.5vmax",
                color: "#6750a4",
                marginBottom: "1vmax",
              }}
            >
              Categories{" "}
              {category !== "" && !sort.sort.val && (
                <span
                  style={{
                    cursor: "pointer",
                    color: "red",
                    marginLeft: "3vmin",
                    fontSize: "1.3vmax",
                  }}
                  onClick={() => {
                    setCategory("");
                    clear();
                  }}
                >
                  Clear
                </span>
              )}
            </div>
            <div className="categories">
              {categoryOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setCategory(option.value);
                    clear();
                  }}
                  style={category === option.value ? { color: "purple" } : {}}
                >
                  {category === option.value && <span>{rightArrow}</span>}{" "}
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          {/* Gender filter */}
          <div
            className="gender container"
            style={{
              padding: "auto",
              fontSize: "1.5vmax",
              color: "#6750a4",
              marginBottom: "1vmax",
            }}
          >
            Gender
            {gender !== "" && !sort.sort.val && (
              <span
                style={{
                  cursor: "pointer",
                  color: "red",
                  marginLeft: "3vmin",
                  fontSize: "1.3vmax",
                }}
                onClick={() => {
                  setGender("");
                  clear();
                }}
              >
                Clear
              </span>
            )}
            {genderOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setGender(option.value);
                  clear();
                }}
                style={gender === option.value ? { color: "purple" } : {}}
              >
                {gender === option.value && <span>{rightArrow}</span>}{" "}
                {option.label}
              </div>
            ))}
          </div>

          {/* Company filter */}
          <div className="company container">
            <span
              style={{
                padding: "auto",
                fontSize: "1.5vmax",
                color: "#6750a4",
                marginBottom: "1vmax",
              }}
            >
              Companies
            </span>{" "}
            {company !== "" && !sort.sort.val && (
              <span
                style={{
                  cursor: "pointer",
                  color: "red",
                  marginLeft: "3vmin",
                  fontSize: "1.3vmax",
                }}
                onClick={() => {
                  setCompany("");
                  clear();
                }}
              >
                Clear
              </span>
            )}
            {companies.map((com) => {
              return (
                <div
                  key={com}
                  onClick={() => {
                    setCompany(com);
                    clear();
                  }}
                  style={company === com ? { color: "purple" } : {}}
                >
                  {company === com ? rightArrow : ""}
                  {com}
                </div>
              );
            })}
          </div>

          {/* Rating filter */}
          <div className="ratingfilter container">
            CUSTOMER RATINGS
            {/* Radio buttons for rating filter */}
            <div style={{ position: "relative" }}>
              <input
                type="radio"
                name="ratings"
                id="false"
                onClick={(e) => {
                  setRating(0);
                  clear();
                }}
                style={{ display: "none" }}
              />
              {!sort.sort.val && rating !== 0 && (
                <label
                  htmlFor="false"
                  style={{
                    position: "absolute",
                    top: "-2vmax",
                    right: "-0.6vmax",
                    color: "red",
                  }}
                >
                  Clear
                </label>
              )}
              {ratingOptions.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    name="ratings"
                    id={option.value.toString()}
                    value={option.value}
                    onClick={(e) => {
                      setRating(e.target.value);
                      clear();
                    }}
                    style={radioStyle}
                  />
                  <label
                    htmlFor={option.value.toString()}
                    style={rating == option.value ? { color: "purple" } : {}}
                  >
                    <span
                      style={
                        rating == option.value
                          ? { ...customRadioStyle, borderColor: "purple" }
                          : customRadioStyle
                      }
                      className={rating == option.value ? "purple-radio" : ""}
                    ></span>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="main">
          <div className="sortline" style={{ position: "relative" }}>
            {/* Sort options */}
            <div className="item" style={{ fontWeight: "600" }}>
              Sort By
            </div>
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className={`item ${sort.sort.val === option.value && "active"}`}
                onClick={() => {
                  setSort({ val: option.value });
                  setPage(1);
                  setAllproducts([]);
                  setCategory("");
                  setGender("");
                  setCompany("");
                  setRating(0);
                  navigate("/products");
                }}
              >
                {option.label}
              </div>
            ))}
            {!sort.sort.val &&
              (keyword || category || rating || gender || company || value) && (
                <div
                  className="hi"
                  style={{
                    margin: "0",
                    alignSelf: "center",
                    position: "fixed",
                    top: "13vmax",
                    right: "1vmax",
                    backgroundColor: "white",
                    padding: "1vmax",
                    borderRadius: "3px",
                    zIndex: "8",
                  }}
                >
                  Showing {filteredCount}/{productsCount} results.
                </div>
              )}
          </div>

          {/* Show search results */}
          {!sort.sort.val &&
            (keyword || rating || category || gender || company) && (
              <div
                style={{
                  opacity: "0.9",
                  fontWeight: "500",
                  fontSize: "1.6vmax",
                  width: "fit-content",
                  paddingLeft: "2vmax",
                }}
              >
                Search results for "{keyword ? keyword : `All`}"{" "}
                {category && `in ${category}`}
                {rating !== 0 && ` rated ${rating}+`}
                {gender !== "" && ` in ${gender}'s section`}
                {company !== "" && `, Company -- ${company}`}
              </div>
            )}

          {/* Show loader while fetching data */}
          {loading && page === 1 && <Loader />}

          {/* Infinite scroll to load more products */}
          <InfiniteScroll
            dataLength={Allproducts.length} // This is important field to render the next data
            next={fetchData}
            hasMore={filteredCount !== Allproducts.length}
            loader={
              <div style={{ textAlign: "center", margin: "1vmax" }}>
                <img
                  style={{ width: "8vmax" }}
                  src="https://www.bing.com/th/id/OGC.aabee301152e107b1997f6725a71f7fc?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f1186261%2fscreenshots%2f3718681%2f_______.gif&ehk=XLq3SmNTkA2Bm4kL03q01YHkEnQvfHc3J4jO%2bmvFa%2fo%3d"
                  alt="Loading"
                />
              </div>
            }
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  margin: "1vmax",
                  color: "grey",
                }}
              >
                <b>[ Nothing more to load ]</b>
              </p>
            }
          >
            {/* Render products */}
            <div className="pros">
              {Allproducts &&
                Allproducts[0] &&
                Allproducts.map((product) => (
                  <ProductCard
                    key={product?._id}
                    product={product}
                    rating={product.ratings}
                  />
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
