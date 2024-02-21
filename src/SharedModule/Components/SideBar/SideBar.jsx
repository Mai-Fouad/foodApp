import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import sidebarLogo from "../../../assets/images/sidebarLogo.png";
import ChangePass from "../ChangePass/ChangePass";
import { Modal } from "react-bootstrap";

export default function SideBar() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePass />
        </Modal.Body>
      </Modal>
      <Sidebar collapsed={isCollapsed}>
        <Menu className="pt-4">
          <MenuItem
            onClick={toggleCollapse}
            className="d-flex justify-content-center mb-2"
            icon={<img src={sidebarLogo} alt="sidebar logo" />}
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
            onClick={handleShow}
            icon={<i className="fa-solid fa-unlock-keyhole"></i>}
          >
            Change Password
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
