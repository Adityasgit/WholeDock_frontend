import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonContext from "../../../context/ButtonContext";

const Search = () => {
  const { setSearch } = useContext(ButtonContext);
  const { setAllproducts } = useContext(ButtonContext);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      setSearch(false);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <>
      <form className="searchBox" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter to search products..."
          onChange={(e) => setKeyword(e.target.value)}
          className="inp1"
          style={{
            width: "70%",
            height: "2.5vmax",
            outline: "none",
            border: "none",
            boxShadow: "0 0 0.6px black",
            paddingLeft: "1vmin",
          }}
        />
        <input
          className="inp2"
          type="submit"
          value="
            &#128269;
          "
          onClick={() => {
            setAllproducts([]);
          }}
        />
      </form>
    </>
  );
};

export default Search;
