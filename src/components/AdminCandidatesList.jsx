import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const AdminCandidatesList = () => {
    const location = useLocation();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        setCandidates(location.state.candidates);
    }, [location.state.candidates])

  return (
    <div id="admin-candidates-list">
        <table border="1">
            <thead>
                <tr>
                    <th>Candidate's Name</th>
                    <th>Age</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                {  
                    candidates.map(candidate => {
                        return(
                            <tr key={candidate._id}>
                                <td>{candidate.name}</td>
                                <td>{candidate.age}</td>
                                <td>{candidate.contact}</td>
                            </tr>
                         )
                    })
                } 
            </tbody>
        </table>
    </div>
  )
}

export default AdminCandidatesList