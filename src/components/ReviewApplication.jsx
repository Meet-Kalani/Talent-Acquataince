import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {  useHistory, useLocation } from "react-router-dom";
const baseURL = "https://talent-acquataince.herokuapp.com";

const ReviewApplication = () => {
  const history = useHistory();
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const tokenData = jwt_decode(window.localStorage.getItem('candidate_token'));
    let load = false;
    let loadFeedbackBtn = false;
    let loadFeedback = false;
  useEffect(() => {
    axios
      .get(baseURL + "/candidate/profile/" + location.state.candidate_id)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state.candidate_id]);

  if(location.pathname.slice(0,9) === "/employee" || location.pathname.slice(0,6) === "/admin"){
    loadFeedbackBtn = true;
  }

  if(location.pathname === "/review-application"){
    loadFeedback = true;
  }

  if(profile.profile_picture){
      load = true;
  }
  
  const handleFeedbackBtnClick = () =>{
      history.push({
          pathname:"/employee/send-feedback",
          state:{
              candidate_id: location.state.candidate_id,
              job_id:location.state.job_id,
              company_id:location.state.company_id
          }
      })
  }

  const handleFeedbackClick = () => {
    history.push({
      pathname:"/feedback",
      state:{
        candidate_id: tokenData.credentials.userID,
        job_id:location.state.job_id
      }
    })
  }

  const employerStyle={
    marginLeft:"auto",
    marginRight:"auto"
  }

  const commonStyle = {
    marginLeft: "150px",
    marginRight: "150px"
  }

  return (
      <div>
    <div id="review-application" className="wow vision slideInLeft" style={location.pathname === "/employer/review-application" ? employerStyle : commonStyle}>
      <div className="profile-education">
        <div className="profile-basic">
          {load && <img src={profile.profile_picture.url} alt="Profile" />}
          <h4>{profile.name}</h4>
          <p className="bold-text">{profile.mail}</p>
          <p>{profile.bio}</p>
          <p className="bold-text">{profile.place}</p>
        </div>
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
      </div>      
    </div>
    {
      loadFeedbackBtn && <div className="feedback-cta">
      <p>Write a <span onClick={handleFeedbackBtnClick}>Feedback</span> to help applicant achieve more -></p>
  </div>
    }
    {
      loadFeedback && <div className="feedback-cta">
        <p>You have got <span onClick={handleFeedbackClick}>Feedback</span></p>
      </div>
    }
    </div>
  );
};

export default ReviewApplication;
