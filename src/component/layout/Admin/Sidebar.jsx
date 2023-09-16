import React from "react";
import "./Admin.css";
import logo from "../../../images/logo2.png";
import {
  ExpandMore,
  PostAdd,
  Add,
  ImportExport,
  ListAlt,
  Dashboard,
  People,
  RateReview,
} from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Nandi Gen Store" />
      </Link>
      <Link to="/admin/dashboard">
        <Dashboard /> Dashboard
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ImportExport />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAdd />}></TreeItem>
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<Add />}></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
          <ListAlt /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
