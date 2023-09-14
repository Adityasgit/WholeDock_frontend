import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../../actions/cartAction";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import { Country, State, City } from "country-state-city/lib";
import "./order.css";
import CheckoutSteps from "./CheckoutSteps";
const Shipping = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phone, setPhone] = useState(shippingInfo.phone);
  const [landmark, setLandmark] = useState(shippingInfo.landmark);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  const shippingHandleSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      return alert("Phone Number should be of 10 digits");
    }
    if (!city) {
      return alert("City needed");
    }
    if (address.length < 10) {
      return alert("Give us proper amount of information \n PROPER ADDRESS");
    }
    if (pinCode.length !== 6) {
      return alert("Pincode should be 6 digit");
    }
    dispatch(
      saveShippingInfo({ address, city, state, pinCode, phone, landmark })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingHandleSubmit}
          >
            <div className="">
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="">
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Land-mark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>
            <div className="">
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pincode"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="">
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone N0."
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
              />
            </div>
            <div className="">
              <PublicIcon />
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                <option value={"PB"}>Punjab</option>
                {/* {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    // <option value={item.isoCode} key={item.isoCode}>
                    //   {item.name}
                    // </option>
                  ))} */}
              </select>
            </div>
            {state && (
              <div className="">
                <TransferWithinAStationIcon />
                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">City</option>
                  <option value={"Abohar"}>Abohar</option>
                  {/* {City &&
                    City.getCitiesOfState("IN", "PB").map((item) => (
                      // <option value={item.isoCode} key={item.isoCode}>
                      //   {item.name}
                      // </option>
                    ))} */}
                </select>
              </div>
            )}
            <div className="btn">
              <input
                type="submit"
                value="Continue"
                id="shippingbtn"
                style={state ? { margin: "1vmax" } : { margin: "2vmax" }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
