import React, { useState } from "react";
import { Sidebar as Bar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Sidebar(props) {
  const [toggled, setToggled] = useState(false);
  return (
    <div className="">
      <Bar
        style={{ height: "100vh" }}
        breakPoint="lg"
        toggled={toggled}
        backgroundColor="white"
        onBackdropClick={() => setToggled(false)}
      >
        <Menu closeOnClick={true}>
          <MenuItem component={<Link to="/dashboard" />}>Dashboard</MenuItem>
          <MenuItem component={<Link to="/portfolio" />}>Portfolio</MenuItem>
        </Menu>
      </Bar>
      <span style={{ position: "absolute", top: 0, right: 20 }}>
        <Icon
          Icon={HiOutlineMenuAlt3}
          color={"black"}
          size={"2xlg"}
          onclick={() => setToggled(true)}
        />
      </span>
    </div>
  );
}

export default Sidebar;
