import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const EmployerSignup = () => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [company_bio, setCompany_bio] = useState("");
  const [company_profile_picture, setCompany_profile_picture] = useState({});
  const [company_profile_picture_URL, setCompany_profile_picture_URL] =
    useState({});
  const [passwordLengthErr, setPasswordLengthErr] = useState(false);
  const [nameLengthErr, setNameLengthErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [nameErr, setUserNameErr] = useState(false);
  const [contactErr, setContactErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [company_bioErr, setCompany_bioErr] = useState(false);
  const [company_profile_pictureErr, setCompany_profile_pictureErr] =
    useState(false);
  // const [doneProfilePicture, setDoneProfilePicture] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(true);

  const handleProfilePictureUpload = () => {
    const profile_picture_upload = new FormData();
    profile_picture_upload.append("file", company_profile_picture);
    profile_picture_upload.append("upload_preset", "cloudinary_images");
    profile_picture_upload.append("folder", "job-portal-employer-profile-picture");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/meetkalani/image/upload",
        profile_picture_upload
      )
      .then((response) => {
        setCompany_profile_picture_URL({
          url: response.data.url,
          public_id: response.data.public_id,
        });
        // setDoneProfilePicture(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignupBtnClick = (e) => {
    e.preventDefault();
    setLoadSubmit(false);

    if (mail && password && name && address && company_bio && contact && company_profile_picture_URL && name.length >= 5 && password.length >= 8) {
      setMailErr(false);
      setPasswordErr(false);
      setUserNameErr(false);
      setAddressErr(false);
      setContactErr(false);
      setCompany_profile_pictureErr(false);
      axios
        .post(baseURL + "/employer/signup", {
          name: name,
          mail: mail,
          password: password,
          contact:contact,
          address:address,
          company_bio:company_bio,
          company_profile_picture:company_profile_picture_URL
        })
        .then((res) => {
          history.push('/employer/login');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoadSubmit(true);
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
      if (!name) {
        setUserNameErr(true);
      } else {
        setUserNameErr(false);
      }
      if (!contact) {
        setContactErr(true);
      } else {
        setContactErr(false);
      }
      if (!address) {
        setAddressErr(true);
      } else {
        setAddressErr(false);
      }
      if (!company_bio) {
        setCompany_bioErr(true);
      } else {
        setCompany_bioErr(false);
      }
      if (!company_profile_picture) {
        setCompany_profile_pictureErr(true);
      } else {
        setCompany_profile_pictureErr(false);
      }
      if(name.length <= 5){
        setNameLengthErr(true);
      } else {
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
    <div id="employer-signup">
        <div className="signup-form">
          <h3>Sign Up(Employer)</h3>
          <div>
            <label htmlFor="name">Name</label>
            <input
              placeholder="Enter your name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameErr ? <span>This field cannot be empty.</span> : ""}<br />
            {nameLengthErr ? <span>The length of this field must be greater than 5 characters.</span> : ""}
          </div>
          <div>
            <label htmlFor="mail">Mail</label>
          <input
            placeholder="Enter your mail"
            type="text"
            name="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          {mailErr ? <span>This field cannot be empty.</span> : ""}
          </div>
          <div>
            <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr ? <span>This field cannot be empty.</span> : ""}<br />
          {passwordLengthErr ? <span>The length of this field must be greater than 8 characters.</span> : ""}
          </div>
          <div>
            
          <label htmlFor="company_profile_picture">Profile Picture</label>
          <input
            className="profile_picture"
            type="file"
            name="company_profile_picture"
            onChange={(e) => setCompany_profile_picture(e.target.files[0])}
          />
          <button onClick={handleProfilePictureUpload}>Upload</button>
          {company_profile_pictureErr ? (
            <span>This field cannot be empty.</span>
          ) : (
            ""
          )}
          </div>
          <div>
            <label htmlFor="contact">Contact</label>
          <input
            placeholder="Enter your contact"
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {contactErr ? <span>This field cannot be empty.</span> : ""}
          </div>
          <div>
            <label htmlFor="address">Address</label>
          <input
            placeholder="Enter your address"
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {addressErr ? <span>This field cannot be empty.</span> : ""}
          </div>
          <div>
            <label htmlFor="company_bio">Company Bio</label>
          <textarea
            name="company_bio"
            cols="30"
            rows="10"
            value={company_bio}
            onChange={(e) => setCompany_bio(e.target.value)}
          ></textarea>
          {company_bioErr ? <span>This field cannot be empty.</span> : ""}
          </div>

          <br />
          {loadSubmit ? (
            <button onClick={handleSignupBtnClick}>Submit</button>
          ) : (
            <center>
              <p>Hold on! Redirecting...</p>
            </center>
          )}
          <Link to="/login">Already a Member?</Link>
        </div>
      </div>
    // </div>
  );
};

export default EmployerSignup;
