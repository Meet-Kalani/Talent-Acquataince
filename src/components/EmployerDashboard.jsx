import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useLocation,useHistory} from 'react-router-dom';
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const EmployerDashboard = () => {
    const location = useLocation();
    const history = useHistory();
    const [candidates, setCandidates] = useState({});

    useEffect(() => {
      axios.get(baseURL + '/employer/jobs/'+location.state.job_id+'/candidates',{
          headers:{
              'x-access-token': window.localStorage.getItem('employer_token'),
          }
      })
      .then((res)=>{
          setCandidates(res.data);
      })
      .catch((err)=>{
          console.log(err);
      })
    }, [location.state.job_id])
    
  return (
    <div id="employer-dashboard">
        <table border="1">
            <thead>
                <tr>
                    <th>Candidate's Name</th>
                    <th>Review Application</th>
                </tr>
            </thead>
            <tbody>
                            <tr>
                                <td>{candidates.name}</td>
                                <td><span onClick={()=>{history.push({pathname:'/employer/review-application',state:{job_id:location.state.job_id,candidate_id:candidates._id}})}}>View Application -></span></td>
                            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default EmployerDashboard
