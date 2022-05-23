import React,{useState,useEffect} from 'react';
import {useHistory,useLocation} from "react-router-dom";
import axios from "axios";
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const Applicants = () => {
    const history = useHistory();
    const location = useLocation();
  const [applied_jobs, setApplied_jobs] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "/employee/jobs/"+location.state.job_id+"/candidates", {
        headers: {
          "x-access-token": window.localStorage.getItem("candidate_token"),
        },
      })
      .then((res) => {
        setApplied_jobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state.job_id]);

  return (
    <div id="applicants">
        <table border="1">
        <thead>
          <tr>
            <th>Applicant's Name</th>
            <th>Review Application</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(applied_jobs).length !== 0 &&
            applied_jobs.map((applied_job) => { 
              return (<tr key={applied_job._id}>
                <td>{applied_job.name}</td>
                <td><span onClick={()=>{history.push({pathname:'/employee/review-application',state:{company_id:location.state.company_id,candidate_id:applied_job._id,job_id:location.state.job_id}})}}>View Application -></span></td>
              </tr>);
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Applicants