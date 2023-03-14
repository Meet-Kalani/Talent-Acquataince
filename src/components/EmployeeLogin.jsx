import React,{useState} from "react";
import axios from "axios";
import { useLocation,useHistory } from "react-router-dom";
import LoginImg from "../imgs/login.png";
import Popup from './Popup';
const baseURL = "https://talent-acquataince.onrender.com";
// const baseURL = "http://localhost:5000";

const EmployeeLogin = () => {
    const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mailErr, setMailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  if(location.state){
    location.state = undefined;
    togglePopup();
  }

  const handleSubmitBtnClick = () => {
    if(mail && password){
        axios
      .post(baseURL + "/employee/login", {
        mail: mail,
        password: password,
      })
      .then((res) => {
        if(res.data.success){
          window.localStorage.setItem("employee_token", res.data.token); 
          history.push("/Talent-Acquataince/employee");
        } else {
          alert('Invalid credentials ! Please try again...');
          setMail("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else{
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
    <div id="login">
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
          <button onClick={handleSubmitBtnClick}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
