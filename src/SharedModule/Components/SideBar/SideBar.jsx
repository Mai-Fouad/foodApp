import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import sidebarLogo from "../../../assets/images/sidebarLogo.png";

export default function SideBar() {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onLogoutHandler = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
        <Menu className="pt-4">
          <MenuItem
            onClick={toggleCollapse}
            className="text-center mb-2"
            icon={<img src={sidebarLogo} alt="sidebar logo"/>}
          ></MenuItem>
          <MenuItem
            component={<Link to={"/dashboard"} />}
            icon={<i className="fa-solid fa-house"></i>}
          >
            Home
          </MenuItem>
          <MenuItem
            component={<Link to={"/dashboard/users"} />}
            icon={<i className="fa-solid fa-users"></i>}
          >
            Users
          </MenuItem>
          <MenuItem
            component={<Link to={"/dashboard/recipes"} />}
            icon={<i className="fa-solid fa-book"></i>}
          >
            Recipes
          </MenuItem>
          <MenuItem
            component={<Link to={"/dashboard/categories"} />}
            icon={<i className="fa-solid fa-layer-group"></i>}
          >
            Categories
          </MenuItem>
          <MenuItem
            onClick={onLogoutHandler}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
