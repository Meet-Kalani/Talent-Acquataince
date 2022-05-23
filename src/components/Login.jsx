import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import LoginImg from "../imgs/login.png";
import Popup from './Popup'
import axios from "axios";
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mailErr, setMailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  // const [loadSubmit, setLoadSubmit] = useState(true);
  // const [loadSignup, setLoadSignup] = useState(true);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const toggleAnotherPopup = () => {
    setIsInvalid(!isInvalid);
  }

  if (
    location.pathname.slice(0, 6) === "/admin" ||
    location.pathname.slice(0, 9) === "/employee"
  ) {
    // setLoadSignup(false);
  }
  
  if(location.state){
    location.state = undefined;
    togglePopup();
  }

  const handleEmployerLoginBtnClick = (e) => {
    // setLoadSubmit(false);
    if (mail && password ) {
      setMailErr(false);
      setPasswordErr(false);
      axios
        .post(baseURL + "/employer/login", {
          mail: mail,
          password: password,
        })
        .then((res) => {
          if(res.data.success){
            window.localStorage.setItem("employer_token", res.data.token); 
            history.push("/employer");
          } else {
            setMail("");
            setPassword("");
            toggleAnotherPopup();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // setLoadSubmit(true);
      if (!mail) {
        setMailErr(true);
      } else {
        setMailErr(false);
      }
      if (!password) {
        setPasswordErr(true);
      } else {
        setPasswordErr(false);
      }
    }
  };


  const handleCandidateLoginBtnClick = (e) => {
    // setLoadSubmit(false);
    if (mail && password) {
      setMailErr(false);
      setPasswordErr(false);
      axios
        .post(baseURL + "/candidate/login", {
          mail: mail,
          password: password,
        })
        .then((res) => {
          if(res.data.success){
            window.localStorage.setItem("candidate_token", res.data.token); 
            history.push("/");
          } else {
            setMail("");
            setPassword("");
            toggleAnotherPopup();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // setLoadSubmit(true);
      if (!mail) {
        setMailErr(true);
      } else {
        setMailErr(false);
      }
      if (!password) {
        setPasswordErr(true);
      } else {
        setPasswordErr(false);
      }
    }
  };


  return (
    <div id="login" className="wow vision zoomInDown">
      <div className="d-flex">
        <div className="login-img">
          <img src={LoginImg} alt="talent" />
        </div>
        {isOpen && <Popup
          content={<>
            <p>You are not logged in ! Please login to view more information </p>   
          </>}
          handleClose={togglePopup}
          />}
          {isInvalid && <Popup
          content={<>
            <p>Invalid credentials ! Please try again...</p>   
          </>}
          handleClose={toggleAnotherPopup}
          />}
        <div className="login-form">
          <h3>Login</h3>
          <input
            type="text"
            placeholder="Enter your mail"
            name="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          {mailErr ? <span>This field cannot be empty.</span> : ""}
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr ? <span>This field cannot be empty.</span> : ""}
          <br />
          {location.pathname === "/login" && (
            <button onClick={()=>handleCandidateLoginBtnClick()}>Submit</button>
          )}
          {location.pathname === "/employer/login" && (
            <button onClick={()=>handleEmployerLoginBtnClick()}>Submit</button>
          )}
          {
            (location.pathname === "/employer/login") ? <Link to="/employer/signup">New Member?</Link> : <Link to="/signup">New Member?</Link>
          }
          <Link to={location.pathname.slice(0,9) === "/employer" ? "/employer/contact" : "/contact"} className="forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
