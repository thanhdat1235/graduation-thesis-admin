import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import LogOutModal from "./modals/LogOutModal";
import userService from "../services/userService/userService";
import Router from "next/router";

const HeaderPost = ({ title }) => {
  const [dataUserActive, setDataUserActive] = useState({});
  const [show, setShow] = useState("none");

  useEffect(() => {
    setDataUserActive(JSON.parse(localStorage.getItem("user")));
    // if (title === "Bài viết") {
    //   setShow("");
    // } else {
    //   setShow("none");
    // }
  }, []);

  const handleLogout = async () => {
    try {
      await userService.signOut({});
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="header-post">
        <h3>{title || ""}</h3>
        {/* <h3>Chi tiết sản phẩm</h3> */}
        <div className="profile-content">
          {(title === "Quản lý sách" || title === "Question") && (
            <button
              type="button"
              className="btn create-btn"
              // style={{ display: show }}
              onClick={() => {
                title === "Post";
                if (title === "Quản lý sách") {
                  Router.push("/books/create-book");
                }
              }}
            >
              Tạo
            </button>
          )}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {`${dataUserActive?.first_name || ""} ${
                  dataUserActive?.last_name || ""
                }`}
              </span>
              <img
                className="img-profile rounded-circle"
                src="../img/undraw_profile.svg"
              />
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <Link href="#">
                <a
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </Link>
            </div>
          </li>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderPost;
