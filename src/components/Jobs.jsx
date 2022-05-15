import React,{useState,useEffect} from 'react';
import Job from './Job';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const baseURL = "https://talent-acquataince.herokuapp.com";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios.get(baseURL + '/candidate/jobs')
        .then((res)=>{
            setJobs(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);
    
    if(location.state !== undefined){
      setJobs(location.state.jobs);
    }

  return (
    <div id='jobs'>
      { jobs.map(job=>{
        return <Job job={job} key={job._id} />
      })}      
    </div>
  )
}

export default Jobs