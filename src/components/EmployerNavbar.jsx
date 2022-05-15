import React,{useState} from "react";
import { Link } from "react-router-dom";
import menu from "../imgs/menu.png";
import logo from "../imgs/logo.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(true);

  const toggleIcon = ()=>{
    if(window.screen.width < 992){
      setToggle(!toggle)
    }

    if (window.screen.width > 992) {
      if(!toggle){
        setToggle(true);
      }
    }
  }

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
          {
            toggle &&
            <div className="navigation-menu">
            <ul>
              <li>
                <Link to="/employer" >Home</Link>
              </li>
              <li>
                <Link to="/employer/login">Login / Signup</Link>
              </li>
              <li>
                <Link to="/employer/about">About</Link>
              </li>
            </ul>
          </div>
          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
