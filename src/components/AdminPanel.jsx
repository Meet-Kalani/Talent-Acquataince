import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
const baseURL = "https://talent-acquataince.herokuapp.com";

const AdminPanel = () => {
    const [candidateCount, setCandidateCount] = useState("")
    const [candidates, setCandidates] = useState([]);
    const [employerCount, setEmployerCount] = useState("")
    const [employers, setEmployers] = useState([]);
    const history = useHistory(); 

    useEffect(() => {
      axios.get(baseURL+"/admin/candidates",{
          headers:{
              'x-access-token':window.localStorage.getItem('admin_token')
          }
      })
      .then(res=>{
          setCandidateCount(res.data.length);
          setCandidates(res.data);
      })
      .catch(err=>{
          console.log(err)
      })

      axios.get(baseURL+"/admin/employers",{
        headers:{
            'x-access-token':window.localStorage.getItem('admin_token')
        }
    })
    .then(res=>{
        setEmployerCount(res.data.length);
        setEmployers(res.data);
    })
    .catch(err=>{
        console.log(err)
    })
    }, [])

    const handleCandidateBtnClick = () => {
        history.push({
            pathname:"/admin/list/candidates",
            state:{
                candidates:candidates,
                isFromAdmin:true
            }
        })
    }

    const handleEmployerBtnClick = ()=>{
        history.push({
            pathname:"/admin/list/employers",
            state:{
                employers:employers,
                isFromAdmin:true
            }
        })
    }
    
  return (
    <div id="admin-panel">
        <div className="d-flex">
            <div onClick={handleCandidateBtnClick}>
                <h4>Total Candidates</h4>
                <p>{candidateCount}</p>
            </div>
            <div onClick={handleEmployerBtnClick}>
                <h4>Total Employers</h4>
                <p>{employerCount}</p>
            </div>
        </div>
    </div>
  )
}

export default AdminPanel