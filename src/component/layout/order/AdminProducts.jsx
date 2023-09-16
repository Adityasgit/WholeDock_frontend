import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProducts = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);
  return <></>;
};

export default AdminProducts;
