import React,{useState,useEffect} from 'react';
import Job from './Job';
import axios from 'axios';
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const EmployerJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        
    axios.get(baseURL+'/employer/my-listed-jobs',{
        headers:{
          'x-access-token':window.localStorage.getItem('employer_token')
        }
      })
      .then((res)=>{
        setJobs(res.data)
      })
      .catch((err)=>{
          console.log(err);
      })
    }, []);
    
  return (
    <div id='jobs'>
      {jobs.map(job=>{
        return <Job job={job} key={job._id} />
      })}      
    </div>
  )
}

export default EmployerJobs