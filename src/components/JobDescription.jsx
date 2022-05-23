import React, { useState, useEffect } from "react";
import LoginImg from "../imgs/login.png";
import Popup from "./Popup";
import { useLocation, useHistory , Link} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const JobDescription = (props) => {
  const [job, setJob] = useState({});
  const [loadApplyBtn, setLoadApplyBtn] = useState(true)
  const location = useLocation();
  const history = useHistory();
  let loadEditRemoveBtn = false;
  let loadApplicantsBtn = false;
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  if (
    location.pathname === "/admin/job-description" ||
    location.pathname === "/employer/job-description"
  ) {
    loadEditRemoveBtn = true;
    loadApplicantsBtn = true;
  }

  if (location.pathname === "/employee/job-description") {
    loadApplicantsBtn = true;
  }

  useEffect(() => {
    axios
      .get(baseURL + "/candidate/jobs/" + location.state.job_id, {
        headers: {
          "x-access-token": window.localStorage.getItem("admin_token"),
        },
      })
      .then((res) => {
        setJob(res.data);
        let userCred = jwt_decode(window.localStorage.getItem('candidate_token'))
        res.data.candidate_id.map(id => {
          if(id === userCred.credentials.userID){
            setLoadApplyBtn(false);
          }
          return true;
        })
      })
      .catch((err) => {
        setLoadApplyBtn(false);
        console.log(err);
      });
  }, [location.state.job_id]);
  

  const handleViewApplicantsBtnClick = () => {
    if(location.pathname.slice(0,9) === '/employee'){
      history.push({
        pathname:"/employee/view-applicants",
        state:{job_id:job._id,company_id:job.company_id}
      })
    }else if(location.pathname.slice(0,9) === '/employer'){
      history.push({
        pathname:'/employer/dashboard',
        state:{job_id:job._id}
      })
    } else if(location.pathname.slice(0,6) === '/admin'){
      history.push({
        pathname:"/admin/view-applicants",
        state:{job_id:job._id,company_id:job.company_id}
      })
    }
  };

  const handleRemoveBtnClick = () => {
    axios
      .delete(
        baseURL + "/admin/jobs/" + job._id,

        {
          headers: {
            "x-access-token": window.localStorage.getItem("admin_token"),
          },
        }
      )
      .then((res) => {
        console.log('1');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditBtnClick = () => {
    if(location.pathname.slice(0,9) === "/employer"){
      history.push({
      pathname:'/employer/job/edit',
      state:{job_id:props.job._id}
  })
  } else{
      history.push({
          pathname:'/admin/job/edit',
          state:{job_id:props.job._id}
      })
  }
  };

  const handleApplyBtnClick = () => {
    axios.get(baseURL+'/candidate/profile',{
      headers:{
        'x-access-token':window.localStorage.getItem('candidate_token')
      }
    })
    .then((res)=>{
      if(res.data.bio){
        axios
      .get(baseURL + "/candidate/" + job._id + "/apply", {
        headers: {
          "x-access-token": window.localStorage.getItem("candidate_token"),
        },
      })
      .then((res) => {
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
      } else{
        togglePopup();

      }
    })
    
  };

  return (
    <div id="job-description" className="wow vision zoomInDown">
      
      <div className="d-flex job-top-content">
        <div>
          <h3>{job.title}</h3>
          <p>{job.designation}</p>
        </div>
        <div className="job-logo">
          <img src={LoginImg} alt="Company's Logo" />
        </div>
      </div>
      {isOpen && <Popup
      content={<>
        <p>For applying in job you need to update your profile and you have to provide details about yourself. So head over to <Link to="/profile">profile</Link> page</p>   
      </>}
      handleClose={togglePopup}
      />}
      <div className="d-flex job-bottom-content">
        <div className="d-flex">
          <div className="pay">
            <p>Pay</p>
            <p>{job.pay}/year</p>
          </div>
          <div>
            <p>location</p>
            <p>{job.location}</p>
          </div>
        </div>

        <div className="d-flex">
          {loadApplicantsBtn && (
            <div>
              <span onClick={handleViewApplicantsBtnClick}>
                View Applicants
              </span>
            </div>
          )}
          {loadEditRemoveBtn && (
            <>
              <div>
                <span onClick={handleEditBtnClick}>Edit</span>
              </div>
              <div>
                <span onClick={handleRemoveBtnClick}>Remove</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="vacancy">
        <p>Vacancy</p>
        <p>{job.vacancy}</p>
      </div>
      <div className="job-description">
        <h3>Description</h3>
        <p>{job.description}</p>
      </div>
      <div className="designation">
        <h3>About Designation</h3>
        <p>{job.description_about_designation}</p>
      </div>
      <div className="perks">
        <h3>Perks</h3>
        <div>
          { job.perks &&
          job.perks.map(perk => {
            return <p>{perk}</p>
          })
        }
        </div>
      </div>
      <div className="skills">
        <h3>Skills</h3>
        <div>
        { job.skills &&
          job.skills.map(skill => {
            return <p>{skill}</p>
          })
        }
        </div>
      </div>
      {loadApplyBtn && <button onClick={handleApplyBtnClick}>Apply Now</button>}
    </div>
  );
};

export default JobDescription;
