import React, { useState } from "react";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import {useHistory} from "react-router-dom";
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const Dashboard = () => {
  const history = useHistory();
  const [applied_jobs, setApplied_jobs] = useState([]);
  let tokenData;

  if(window.localStorage.getItem('candidate_token')){
    tokenData = jwt_decode(window.localStorage.getItem('candidate_token'));
  } else{
    history.push({
      pathname:"/login",
      state:{
        isLoggedIn: false
      }
    })
  }

    if(window.localStorage.getItem('candidate_token')){
    axios
      .get(baseURL + "/candidate/applied-jobs", {
        headers: {
          "x-access-token": window.localStorage.getItem("candidate_token"),
        },
      })
      .then((res) => {
        setApplied_jobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });}

  return (
    <div id="dashboard" className="wow vision zoomInDown">
      <table border="1">
        <thead>
          <tr>
            <th>Company</th>
            <th>Designation</th>
            <th>Application Status</th>
            <th>Review Application</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(applied_jobs).length !== 0 &&
            applied_jobs.map((applied_job) => {
              return (<tr key={applied_job._id}>
                <td>{applied_job.company_name}</td>
                <td>{applied_job.designation}</td>
                <td>{applied_job.status}</td>
                <td><span onClick={() => {
                  history.push({
                    pathname:"/review-application",
                    state:{
                      candidate_id:tokenData.credentials.userID,
                      job_id: applied_job._id
                    }
                  })
                }}>View Application -></span></td>
              </tr>);
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
