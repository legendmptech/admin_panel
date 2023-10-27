import React from "react";
import { Sidebar as Bar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <Bar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem component={<Link to="/dashboard" />}>Dashboard</MenuItem>
        <MenuItem component={<Link to="/portfolio" />}>Portfolio</MenuItem>
        <MenuItem component={<Link to="/ecommerce" />}>Ecommerce</MenuItem>
      </Menu>
    </Bar>
  );
}

export default Sidebar;
