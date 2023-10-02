import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompany } from "../../../actions/adminAction";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const AdminControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies } = useSelector((state) => state.controller);
  const handledelete = (i) => {
    const conti = prompt(
      "Are you sure you want to delete?\n Type 1 for delete"
    );
    if (conti !== "1") return;
    let newarr = companies.filter((item, idx) => {
      return idx !== i;
    });
    dispatch(setCompany(newarr));
  };
  const [company, setCom] = useState("");
  const addhandler = () => {
    if (company.length < 3) return;
    const newarr = [...companies, company];
    dispatch(setCompany(newarr));
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
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
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
                  }}
                >
                  {companies.map((item, idx) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          width: "50%",
                          maxWidth: "50%",
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
            </div>
          </h1>
        </div>
      </div>
    </>
  );
};

export default AdminControl;
