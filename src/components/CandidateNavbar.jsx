import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import menu from "../imgs/menu.png";
import logo from "../imgs/logo.png";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const [toggle, setToggle] = useState(true);

  const toggleIcon = () => {
    if (window.screen.width < 992) {
      setToggle(!toggle);
    }

    if (window.screen.width > 992) {
      if (!toggle) {
        setToggle(true);
      }
    }
  };

  return (
    <div id="navbar">
      <nav>
        <div className="d-flex">
          <div className="d-flex-header">
            <div className="logo">
              <div>
                <img src={logo} alt="logo" />
              </div>
              <div>
                <h2>Talent Acquataince</h2>
                <p>Together We Grow</p>
              </div>
            </div>
            <div className="hamburger-icon" onClick={toggleIcon}>
              <img src={menu} alt="hamburger menu" />
            </div>
          </div>
          {toggle && (
            <div className="navigation-menu">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/login">Login / Signup</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact / FAQs</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
