import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../../actions/productAction";
import { Button } from "@mui/material";
import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
  ProductionQuantityLimits,
  Category,
  DateRange,
  PriorityHigh,
  LinkedCamera,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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
const UpdateProduct = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setMRP(product.MRP);
      setPrice0(product.price[0]);
      setPrice1(product.price[1]);
      setQuantity(product.Quantity);
      setCompany(product.companyName);
      setDate(product.ExpiresOn);
      setPriority(product.priority);
      setStock(product.stock);
      setKeywords(product.keywords);
      setCategory(product.category);
      setOldImages(product.images);
    }
    if (user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, dispatch, isAuthenticated, user, product, productId]);
  const [name, setName] = useState("");
  const [MRP, setMRP] = useState();
  const [price0, setPrice0] = useState();
  const [price1, setPrice1] = useState();
  const [quantity, setQuantity] = useState();
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState();
  const [stock, setStock] = useState();
  let [keywords, setKeywords] = useState([]);
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [oldImages, setOldImages] = useState([]);

  const keywordonchange = () => {
    setKeywords((old) => [...old, keyword]);
    setKeyword("");
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Product Updated successfully");
      dispatch(getProductDetails(productId));
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, navigate, isUpdated, updateError, productId]);

  const handleRemove = (i) => {
    setKeywords(
      keywords.filter((item, idx) => {
        return idx !== i;
      })
    );
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.append("name", name);
    myform.append("description", description);
    myform.append("price", price0);
    myform.append("price", price1);
    myform.append("MRP", MRP);
    myform.append("priority", priority);
    myform.append("category", category);
    myform.append("stock", stock);
    myform.append("ExpiresOn", date);
    myform.append("companyName", company);
    myform.append("Quantity", quantity);
    myform.append("images", images);
    myform.append("keywords", keywords);

    // images.map((image) => {
    //   myform.append("images", image);
    //   console.log(image);
    // });
    // keywords.forEach((keyword) => {
    //   myform.append("keywords", keyword);
    // });

    dispatch(updateProduct(productId, myform));
  };

  const updateproductimagesChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const filereader = new FileReader();

      filereader.onload = () => {
        if (filereader.readyState === 2) {
          setImagesPreview((old) => [...old, filereader.result]);
          setImages((old) => [...old, filereader.result]);
        }
      };
      filereader.readAsDataURL(file);
    });
  };
  return (
    <>
      <div
        className="page"
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div
          style={{
            width: "100vw",
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 5fr",
            position: "absolute",
            top: "6vmax",
          }}
        >
          <Sidebar />
          <div className="newproductcontainer">
            <h1
              style={{
                textAlign: "center",
                width: "100%",
                padding: "2vmax",
                fontFamily: "sans-serif",
                fontWeight: "900",
              }}
            >
              Update Product
            </h1>
            <form onSubmit={updateProductSubmitHandler}>
              <div>
                <div>
                  <Spellcheck />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <AttachMoney />
                  <input
                    type="number"
                    placeholder="MRP"
                    required
                    value={MRP}
                    onChange={(e) => setMRP(e.target.value)}
                  />
                </div>
                <div>
                  <AttachMoney />
                  <input
                    type="number"
                    placeholder="Re-seller Price"
                    required
                    value={price0}
                    onChange={(e) => setPrice0(e.target.value)}
                  />
                </div>
                <div>
                  <AttachMoney />
                  <input
                    type="number"
                    placeholder="Customer Price"
                    required
                    value={price1}
                    onChange={(e) => setPrice1(e.target.value)}
                  />
                </div>
                <div>
                  <ProductionQuantityLimits />
                  <input
                    type="text"
                    placeholder="Product Quantity"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Category />
                  <input
                    type="text"
                    placeholder="Product Company"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div>
                  <DateRange />
                  <input
                    type="date"
                    placeholder="Product Expiry Date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <PriorityHigh />
                  <input
                    type="number"
                    placeholder="Product Priority"
                    required
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <p>
                  Keywords{" "}
                  <span
                    onClick={() => setOpen(true)}
                    style={{
                      fontSize: "1vmax",
                      textAlign: "center",
                      padding: "1vmin",
                      border: "1px solid",
                      borderRadius: "50%",
                      marginLeft: "1vmax",
                      width: "2vmax",
                      display: "inline-block",
                      height: "2vmax",
                      cursor: "pointer",
                    }}
                  >
                    !
                  </span>
                </p>
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={() => (open ? setOpen(false) : setOpen(true))}
                >
                  <DialogTitle>Keywords</DialogTitle>
                  <DialogContent style={{ display: "flex", flexWrap: "wrap" }}>
                    {keywords.length < 1 && (
                      <p style={{ fontSize: "1vmax", color: "grey" }}>
                        No Keywords
                      </p>
                    )}{" "}
                    {keywords &&
                      keywords.map((key, i) => (
                        <span
                          style={{
                            margin: "3px",
                            padding: "5px",
                            border: "1px solid blue",
                            color: "blue",
                            borderRadius: "10px",
                          }}
                        >
                          <span style={{ fontSize: "1.2vmax" }}>{key}</span>
                          <button
                            style={{
                              padding: "1px",
                              fontSize: "1vmax",
                              width: "fit-content",
                              color: "red",
                              backgroundColor: "white",
                            }}
                            onClick={() => handleRemove(i)}
                          >
                            X
                          </button>
                        </span>
                      ))}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                  </DialogActions>
                </Dialog>
                <div>
                  <br />
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "20vmax",
                      maxHeight: "5vmax",
                      overflow: "scroll",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      padding: "5px",
                    }}
                  >
                    {keywords.length < 1 && (
                      <p style={{ fontSize: "1vmax", color: "grey" }}>
                        No Keywords
                      </p>
                    )}{" "}
                    {keywords &&
                      keywords.map((key, i) => (
                        <span
                          style={{
                            margin: "3px",
                            padding: "5px",
                            border: "1px solid blue",
                            color: "blue",
                            borderRadius: "10px",
                          }}
                        >
                          <span style={{ fontSize: "1.2vmax" }}>{key}</span>
                          <button
                            style={{
                              padding: "1px",
                              fontSize: "1vmax",
                              width: "fit-content",
                              color: "red",
                              backgroundColor: "white",
                            }}
                            onClick={() => handleRemove(i)}
                          >
                            X
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <LinkedCamera />
                  <input
                    type="text"
                    placeholder="Product Keywords"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />{" "}
                  <Button
                    style={{ position: "absolute", right: "-4.5vmax" }}
                    disabled={keyword.length < 1 || keyword.trim() === ""}
                    onClick={keywordonchange}
                  >
                    ADD
                  </Button>
                </div>
                <div>
                  <Description />
                  <textarea
                    placeholder="Product Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <AccountTree />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categoryOptions.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Storage />
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div id="imagefileinput">
                  <input
                    type="file"
                    placeholder="Image"
                    required
                    accept="image/*"
                    multiple
                    onChange={updateproductimagesChangeHandler}
                  />
                </div>
                {oldImages && (
                  <div id="imagefileoutput">
                    {oldImages.map((img, i) => (
                      <img src={img.url} alt={img} key={i} />
                    ))}
                  </div>
                )}
                <div id="imagefileoutput">
                  {imagesPreview.map((img, i) => (
                    <img src={img} alt={img} key={i} />
                  ))}
                </div>
              </div>
              <Button type="submit" disabled={loading ? true : false}>
                {" "}
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
