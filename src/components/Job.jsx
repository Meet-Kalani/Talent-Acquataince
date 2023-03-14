import React from 'react';
import LoginImg from '../imgs/login.png';
import pay from '../imgs/pay.png';
import locationIcon from '../imgs/location.png';
import {useHistory,useLocation} from 'react-router-dom';
import axios from 'axios';
const baseURL = "https://talent-acquataince.onrender.com";
// const baseURL = "http://localhost:5000";

const Job = (props) => {
    const history = useHistory();
    const location = useLocation();
    let loadEditRemoveBtn = false;

    if(location.pathname === "/admin" || location.pathname === "/employer"){
        loadEditRemoveBtn = true;
    }

    if(window.localStorage.getItem('employee_token') === null && location.pathname === "/employee"){
        history.push({
            pathname:'/Talent-Acquataince/employee/login',
            state:{
                isLoggedIn:false
            }
        })
    }

    if(window.localStorage.getItem('employer_token') === null && location.pathname === "/employer"){
        history.push({
            pathname:'/Talent-Acquataince/employer/login',
            state:{
                isLoggedIn:false
            }
        })
    }

    if(window.localStorage.getItem('admin_token') === null && location.pathname === "/admin"){
        history.push({
            pathname:'/Talent-Acquataince/admin/login',
            state:{
                isLoggedIn:false
            }
        })
    }

    const handleMoreDetailsBtnClick = ()=>{
        if(location.pathname === '/'){
            history.push({
                pathname:'/Talent-Acquataince/job-description',
                state:{job_id:props.job._id}
            })
        } else if(location.pathname === '/admin'){
            history.push({
                pathname:'/Talent-Acquataince/admin/job-description',
                state:{job_id:props.job._id}
            })
        } else if(location.pathname === '/employer'){
            history.push({
                pathname:'/Talent-Acquataince/employer/job-description',
                state:{job_id:props.job._id}
            })
        } else if(location.pathname === '/employee'){
            history.push({
                pathname:'/Talent-Acquataince/employee/job-description',
                state:{job_id:props.job._id}
            })
        }
    }

    const handleRemoveBtnClick = () => {
        axios.delete(baseURL+'/admin/jobs/'+props.job._id
        ,
    {
        headers: {
          "x-access-token": window.localStorage.getItem("admin_token"),
        },
      })
        .then((res)=>{
            if(location.pathname.slice(0,9) === "/employer"){
                history.push('/Talent-Acquataince/employer');
            } else {
                history.push('/Talent-Acquataince/admin');
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleEditBtnClick = () =>{
        if(location.pathname.slice(0,9) === "/employer"){
            history.push({
            pathname:'/Talent-Acquataince/employer/job/edit',
            state:{job_id:props.job._id}
        })
        } else{
            history.push({
                pathname:'/Talent-Acquataince/admin/job/edit',
                state:{job_id:props.job._id}
            })
        }
    }

  return (
    <div id='job' className="wow vision zoomInDown">
        <div className="d-flex job-top-content">
            <div>
                <h3>
                    {props.job.title}
                </h3>
                <p>{props.job.designation}</p>
            </div>
            <div className='job-logo'>
                <img src={LoginImg} alt="Company's Logo" />
            </div>
        </div>
        <div className="d-flex job-bottom-content">
            <div>
                <div className="d-flex-icon">
                <p>Pay</p>
                <img src={pay} alt="salary icon" />
                </div>
                <p>{props.job.pay}/year</p>
            </div>
            <div>
                <div className="d-flex-icon">
                <p>location</p>
                <img src={locationIcon} alt="location icon" />
                </div>
                <p>{props.job.location}</p>
            </div>
            <div className="d-flex">
                {
                    loadEditRemoveBtn && 
                    <>
                        <span onClick={handleEditBtnClick} className="edit-btn">Edit</span>
                        <span onClick={handleRemoveBtnClick} className="remove-btn">Remove</span>
                    </>
                }
                <span onClick={handleMoreDetailsBtnClick}>More Details -></span>
            </div>
        </div>
    </div>
  )
}

export default Job 