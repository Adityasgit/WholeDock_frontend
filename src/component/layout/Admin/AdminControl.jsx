import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompany, setDelivery, setOrg } from "../../../actions/adminAction";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const AdminControl = () => {
  const { delivery } = useSelector((state) => state.controller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { org } = useSelector((state) => state.controller);
  const [orgName, setOrgName] = useState(org ? org.fName : "");
  const [orgLastname, setOrgLastName] = useState(org ? org.lName : "");
  const { companies } = useSelector((state) => state.controller);
  const [delivery0, setDelivery0] = useState(delivery && delivery[0]);
  const [delivery1, setDelivery1] = useState(delivery && delivery[1]);
  const delHandler = () => {
    if (!delivery0 || !delivery1) return;
    dispatch(setDelivery([parseInt(delivery0), parseInt(delivery1)]));
    alert("changed");
  };
  const handledelete = (i) => {
    const conti = prompt(
      "Are you sure you want to delete?\n Type 1 for delete"
    );
    if (conti !== "1") return;
    let newarr = companies.filter((item, idx) => {
      return idx !== i;
    });
    dispatch(setCompany(newarr));
    alert("added");
  };
  const [company, setCom] = useState("");
  const addhandler = () => {
    if (company.length < 3) return;
    const newarr = [...companies, company];
    dispatch(setCompany(newarr));
    alert("changed");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (orgName === "" || orgLastname === "") return;
    dispatch(setOrg({ ...org, fName: [orgName], lName: [orgLastname] }));
  };
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated && isAuthenticated === false) {
      navigate("/login");
    }
    if (user && user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user, isAuthenticated]);
  return (
    <>
      {" "}
      <div
        className="page adminctrl"
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
          <h1
            style={{
              textAlign: "center",
              width: "100%",
              padding: "2vmax",
              fontFamily: "sans-serif",
              fontWeight: "900",
            }}
          >
            Controller
            <div
              className="mainofdel"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                margin: "1vmax",
              }}
            >
              <div style={{ margin: "1vmax", width: "60%", textAlign: "left" }}>
                <Typography
                  style={{ font: "400 1.6vmax Roboto", position: "relative" }}
                >
                  Companies{" "}
                  <input
                    style={{ margin: "0 1vmax" }}
                    type="text"
                    value={company}
                    onChange={(e) => setCom(e.target.value)}
                  />{" "}
                  <span
                    onClick={addhandler}
                    style={{
                      position: "relative",
                      left: "1vmax",
                      color: "darkblue",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </span>
                </Typography>
                <div
                  style={{
                    margin: "2vmax",
                    padding: "2vmin",
                    display: "flex",
                    flexWrap: "wrap",
                    maxHeight: "25vh",
                    overflow: "scroll",
                    width: "50vmax",
                  }}
                >
                  {companies.map((item, idx) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          width: "40%",
                          maxWidth: "40%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          margin: "1vmin",
                          borderBottom: "1px solid grey",
                          padding: "1vmax",
                        }}
                      >
                        <p
                          style={{
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                            font: "200 1.5vmax cursive",
                          }}
                        >
                          {item}
                        </p>
                        <span
                          onClick={() => handledelete(idx)}
                          style={{ cursor: "pointer" }}
                        >
                          <Delete />
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div style={{ margin: "1vmax", width: "60%", textAlign: "left" }}>
                <form onSubmit={handleSubmit}>
                  <Typography
                    style={{
                      font: "400 1.6vmax Roboto",
                      position: "relative",
                      margin: "1vmax",
                    }}
                  >
                    Organisation settings{" "}
                  </Typography>
                  <input
                    style={{ margin: "0 1vmax" }}
                    placeholder="First Name"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />{" "}
                  <input
                    style={{ margin: "0 1vmax" }}
                    placeholder="Last Name"
                    type="text"
                    value={orgLastname}
                    onChange={(e) => setOrgLastName(e.target.value)}
                  />{" "}
                  <input
                    style={{ margin: "0 1vmax" }}
                    placeholder="Logo URL"
                    type="text"
                  />{" "}
                  <input type="submit" value="Change" />
                </form>
              </div>
              <div style={{ margin: "1vmax", width: "60%", textAlign: "left" }}>
                <Typography
                  style={{
                    font: "400 1.6vmax Roboto",
                    position: "relative",
                    margin: "1vmax",
                  }}
                >
                  Delivery Charges{" "}
                  <span
                    onClick={delHandler}
                    style={{
                      position: "relative",
                      left: "1vmax",
                      color: "darkblue",
                      cursor: "pointer",
                    }}
                  >
                    <input type="submit" name="" id="" value="Change" />{" "}
                  </span>{" "}
                </Typography>{" "}
                <div>
                  <input
                    style={{ margin: "0 1vmax" }}
                    type="number"
                    name="0"
                    value={delivery0}
                    onChange={(e) => setDelivery0(e.target.value)}
                  />{" "}
                  <input
                    style={{ margin: "0 1vmax" }}
                    type="number"
                    name="1"
                    value={delivery1}
                    onChange={(e) => setDelivery1(e.target.value)}
                  />{" "}
                </div>
              </div>
            </div>
          </h1>
        </div>
      </div>
    </>
  );
};

export default AdminControl;
