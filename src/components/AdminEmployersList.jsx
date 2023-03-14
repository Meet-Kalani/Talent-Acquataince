import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const AdminCandidatesList = () => {
    const location = useLocation();
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        setEmployers(location.state.employers);
    }, [location.state.employers])

  return (
    <div id="admin-candidates-list">
        <table border="1">
            <thead>
                <tr>
                    <th>Employer's Name</th>
                </tr>
            </thead>
            <tbody>
                {  
                    employers.map(employer => {
                        return(
                            <tr key={employer._id}>
                                <td>{employer.company_name}</td>
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