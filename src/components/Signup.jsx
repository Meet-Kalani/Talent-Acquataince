import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import SignupImg from "../imgs/signup.png";
import axios from 'axios';
const baseURL = "https://talent-acquataince.herokuapp.com";

const Signup = () => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mailErr, setMailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [nameErr, setUserNameErr] = useState(false);
  const [nameLengthErr, setNameLengthErr] = useState(false);
  const [passwordLengthErr, setPasswordLengthErr] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(true);
  
  const handleSignupBtnClick = (e) => {
    e.preventDefault();
    setLoadSubmit(false);
    if (mail !== "" && password !== "" && name !== "" && mail.length > 5 && password.length > 8) {
      setMailErr(false);
      setPasswordErr(false);
      setUserNameErr(false);
        axios
      .post(baseURL + "/candidate/signup", {
        name: name,
        mail: mail,
        password: password,
      })
      .then((res) => {
        window.localStorage.setItem('candidate_token','');
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      setLoadSubmit(true);
      if (mail === "") {
        setMailErr(true);
      } else {
        setMailErr(false);
      }
      if (password === "") {
        setPasswordErr(true);
      } else {
        setPasswordErr(false);
      }
      if (name === "") {
        setUserNameErr(true);
      } else {
        setUserNameErr(false);
      }
      if(name.length <= 5){
        setNameLengthErr(true);
      } else{
        setNameLengthErr(false);
      }
      if(password.length <= 8){
        setPasswordLengthErr(true);
      } else{
        setPasswordLengthErr(false);
      }
    }
  };

  return (
    <div id="signup" className="wow vision zoomInDown">
      <div className="d-flex">
        <div className="signup-img">
          <img src={SignupImg} alt="talent" />
        </div>
        <div className="signup-form">
          <h3>Sign Up</h3>
          <input
            placeholder="Enter your name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameErr ? <span>This field cannot be empty.</span> : ""}<br/>
          {nameLengthErr ? <span>The length of this field must be greater than 5 characters.</span> : ""}
          <input
            placeholder="Enter your mail"
            type="text"
            name="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          {mailErr ? <span>This field cannot be empty.</span> : ""}
          <input
            placeholder="Enter your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr ? <span>This field cannot be empty.</span> : ""}<br />
          {passwordLengthErr ? <span>The length of this field must be greater than 8 characters.</span> : ""}<br/>
          {loadSubmit ? <button onClick={handleSignupBtnClick}>Submit</button> : <center><p>Hold on! Redirecting...</p></center>}
                    <Link to="/login">Already a Member?</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
