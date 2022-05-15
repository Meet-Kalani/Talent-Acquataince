import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const baseURL = "https://talent-acquataince.herokuapp.com";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const history = useHistory();
  let load = true;

    if(window.localStorage.getItem('candidate_token')){
    axios
      .get(
        baseURL + "/candidate/profile",
        {
          headers: {
            "x-access-token": window.localStorage.getItem("candidate_token"),
          },
        }
      )
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      } else{
        history.push({
          pathname:"/login",
          state:{
            isLoggedIn: false
          }
        })
      }

  const handleEditProfileBtnClick = () => {
    history.push({
      pathname: "/profile/edit",
      state: { profile_id: profile._id },
    });
  };

  if (profile.profile_picture === undefined) {
    load = false;
  }

  return (
    <div id="profile">
      <div className="profile-basic wow vision slideInLeft">
        <div>{load ? <img src={profile.profile_picture.url} alt="Profile" /> : ""}</div>
        <h4>{profile.name}</h4>
        <p className="bold-text">{profile.mail}</p>
        <p>{profile.bio}</p>
        <p className="bold-text">{profile.place}</p>
      </div>
      <div className="profile-education wow vision slideInRight">
        <div className="d-flex ssc-content">
          <div>
            <h4>SSC Result</h4>
            <p>{profile.SSC}</p>
          </div>
          <div>
            <h4>SSC Year</h4>
            <p>{profile.SSC_year}</p>
          </div>
        </div>
        <div className="d-flex hsc-content">
          <div>
            <h4>HSC Result</h4>
            <p>{profile.HSC}</p>
          </div>
          <div>
            <h4>HSC Year</h4>
            <p>{profile.HSC_year}</p>
          </div>
        </div>
        <div className="under-graduation-content">
          <h4>Under Graduation Details</h4>
          <p>{profile.UG_percentage}</p>
          <p>{profile.UG_course_name}</p>
          <p>{profile.UG_institute_name}</p>
          <p>{profile.UG_passing_year}</p>
        </div>
        <div className="post-graduation-content">
          <h4>Post Graduation Details</h4>
          <p>{profile.PG_percentage}</p>
          <p>{profile.PG_course_name}</p>
          <p>{profile.PG_institute_name}</p>
          <p>{profile.PG_passing_year}</p>
        </div>
        <button onClick={handleEditProfileBtnClick}>Edit Profile</button>
      </div>
    </div>
  );
};

export default React.memo(Profile);
