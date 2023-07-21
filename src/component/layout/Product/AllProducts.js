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

function valuetext(value) {
  return `${value}`;
}
const rightArrow = ">";
const minDistance = 150;

const AllProducts = () => {
  const { value, setValue, category, setCategory } = useContext(ButtonContext);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
    setAllproducts([]);
    setSort({ val: false });
    setPage(1);
  };

  const navigate = useNavigate();
  const { sort, setSort } = useContext(ButtonContext);
  const dispatch = useDispatch();
  const params = useParams();
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  const keyword = params.keyword;
  const { Allproducts, setAllproducts } = useContext(ButtonContext);

  const [page, setPage] = useState(1);
  const fetchData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      clearErrors();
    }
    dispatch(getProducts(sort, page, keyword, value, category));
  }, [dispatch, sort, error, page, keyword, value, category]);
  useEffect(() => {
    setAllproducts([...Allproducts, ...products]);
    // comment for ignore the warning
    // eslint-disable-next-line
  }, [products]);
  return (
    <>
      <>
        <div className="allp">
          <div className="filterbar">
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
              <Typography>Price</Typography>
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
            </div>
            <div className="category container">
              <div
                style={{
                  padding: "auto",
                  fontSize: "1.5vmax",
                  color: "#6750a4",
                }}
              >
                Categories{" "}
                {category !== "" && (
                  <span
                    style={{
                      cursor: "pointer",
                      color: "red",
                      marginLeft: "3vmin",
                      fontSize: "1.3vmax",
                    }}
                    onClick={() => setCategory("")}
                  >
                    Clear
                  </span>
                )}
              </div>
              <div className="categories">
                <div
                  onClick={() => {
                    setCategory("Facial");
                    setAllproducts([]);
                    setPage(1);
                    setSort({ val: false });
                    navigate("/products");
                  }}
                  style={category === "Facial" ? { color: "purple" } : {}}
                >
                  {category === "Facial" && <span>{rightArrow}</span>} Facial
                  and Skin Care
                </div>
                <div
                  onClick={() => {
                    setCategory("Body");
                    setAllproducts([]);
                    setSort({ val: false });
                    navigate("/products");
                  }}
                  style={category === "Body" ? { color: "purple" } : {}}
                >
                  {category === "Body" && <span>{rightArrow}</span>} Body care
                </div>
                <div
                  onClick={() => {
                    setCategory("Home");
                    setAllproducts([]);
                    setPage(1);

                    setSort({ val: false });
                    navigate("/products");
                  }}
                  style={category === "Home" ? { color: "purple" } : {}}
                >
                  {category === "Home" && <span>{rightArrow}</span>} Home
                  essentials
                </div>
                <div
                  onClick={() => {
                    setCategory("Other");
                    setAllproducts([]);
                    setPage(1);

                    setSort({ val: false });
                    navigate("/products");
                  }}
                  style={category === "Other" ? { color: "purple" } : {}}
                >
                  {category === "Other" && <span>{rightArrow}</span>} Others
                </div>
              </div>
            </div>
          </div>
          <div className="main">
            {loading && <Loader />}

            <div className="sortline">
              <div className="item" style={{ fontWeight: "600" }}>
                Sort By
              </div>
              <div
                className={`item ${sort.sort.val === "_id" && "active"}`}
                onClick={() => {
                  setSort({ val: "_id" });
                  setPage(1);
                  setAllproducts([]);
                  setCategory(false);
                  navigate("/products");
                }}
              >
                Relevence
              </div>
              <div
                className={`item ${sort.sort.val === "-stock" ? "active" : ""}`}
                onClick={() => {
                  setSort({ val: "-stock" });
                  setPage(1);
                  setAllproducts([]);
                  setCategory(false);
                  navigate("/products");
                }}
              >
                Popularity
              </div>
              <div
                className={`item ${sort.sort.val === "MRP" ? "active" : ""}`}
                onClick={() => {
                  setSort({ val: "MRP" });
                  setPage(1);
                  setAllproducts([]);
                  setCategory(false);
                  navigate("/products");
                }}
              >
                Price -- Low to High
              </div>
              <div
                className={`item ${sort.sort.val === "-MRP" ? "active" : ""}`}
                onClick={() => {
                  setSort({ val: "-MRP" });
                  setPage(1);
                  setAllproducts([]);
                  setCategory(false);
                  navigate("/products");
                }}
              >
                Price -- High to Low
              </div>
              <div
                className={`item ${
                  sort.sort.val === "-createdAt" ? "active" : ""
                }`}
                onClick={() => {
                  setSort({ val: "-createdAt" });
                  setPage(1);
                  setAllproducts([]);
                  setCategory(false);
                  navigate("/products");
                }}
              >
                Newest first
              </div>
            </div>
            {keyword && (
              <div
                style={{
                  opacity: "0.9",
                  fontWeight: "500",
                  fontSize: "1.6vmax",
                  width: "fit-content",
                  paddingLeft: "2vmax",
                }}
              >
                Search results for "{keyword}"
              </div>
            )}
            <InfiniteScroll
              dataLength={Allproducts.length} //This is important field to render the next data
              next={fetchData}
              hasMore={productsCount !== Allproducts.length}
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
              <div className="pros">
                {Allproducts &&
                  Allproducts[0] &&
                  Allproducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      rating={product.ratings}
                    />
                  ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </>
    </>
  );
};

export default AllProducts;
