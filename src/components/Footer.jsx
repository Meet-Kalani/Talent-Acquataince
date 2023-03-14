import React from 'react';
import {Link,useLocation} from 'react-router-dom';
import logo from '../imgs/logo.png';
import contactIcon from '../imgs/contact.png';
import locationIcon from '../imgs/location.png';
import mailIcon from '../imgs/mail.png';

const Footer = () => {
    const location = useLocation();

  return (
    <div id="footer">
        <div className="d-flex">
            {   
                (location.pathname.slice(0,9) !== "/employer" && location.pathname.slice(0,9) !== "/employee" && location.pathname.slice(0,6) !== "/admin" ) && <div className="quick-links">
                <h3>Quick Links</h3>
                <Link to="/Talent-Acquataince/">Home</Link><br />
                <Link to="/Talent-Acquataince/dashboard">Dashboard</Link><br />
                <Link to="/Talent-Acquataince/profile">Profile</Link><br />
                <Link to="/Talent-Acquataince/contact">Contact</Link>
            </div> 
            }
            <div>
            <h3>Contact Us</h3>
                <div className="d-flex-icon">
                    <img src={mailIcon} alt="mail icon" />
                <p>talentacquataince@gmail.com</p>
                </div>
                <div className="d-flex-icon">
                <img src={contactIcon} alt="contact icon" />
                    <p>(+91) 998 877 6655</p>
                </div>
                <div className="d-flex-icon">
                    <img src={locationIcon} alt="location icon" />
                <p>32, Franklin Roosevelt Street, DownTown, Windsor, Canada</p>
                </div>
            </div>
            <div className="logo">
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <div>
                <h3>Talent Acquataince</h3>
                <p>Together We Grow</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer