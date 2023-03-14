import React,{useState} from "react";
import axios from "axios";
import{useLocation,useHistory} from "react-router-dom";
const baseURL = "https://talent-acquataince.onrender.com";
// const baseURL = "http://localhost:5000";

const CreateFeedback = () => {
    const history = useHistory();
    const location = useLocation();
    const [overall_feedback, setOverall_feedback] = useState("")
    const [description, setDescription] = useState("");
    const [overall_feedbackErr, setOverall_feedbackErr] = useState(false)
    const [descriptionErr, setDescriptionErr] = useState(false);

    const handleSubmitBtnClick = ()=>{
        if(overall_feedback && description){
          axios.post(baseURL+"/employee/jobs/"+location.state.job_id+"/candidates/"+location.state.candidate_id+"/feedback",{
            description:description,
            overall_feedback:overall_feedback,
            company_id:location.state.company_id        
        },{
            headers:{
                "x-access-token":window.localStorage.getItem('employee_token')
            }
        })
        .then((res)=>{
            history.push('/Talent-Acquataince/employee');
        })
        .catch((err)=>{
            console.log(err);
        })
        } else{
          if(!overall_feedback){
            setOverall_feedbackErr(true);
          } else{
            setOverall_feedbackErr(false);
          }
          if(!description){
            setDescriptionErr(true);
          } else{
            setDescriptionErr(false);
          }
        }
    }

  return (
    <div id="create-feedback">
      <div>
        <p>Overall Feedback</p>
        <input
          type="text"
          placeholder="Enter your Overall Feedback"
          name="overall_feedback"
          value={overall_feedback}
          onChange={(e) => setOverall_feedback(e.target.value)}
        />
        {overall_feedbackErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Description</p>
        <textarea
          name="description"
          cols="30"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {descriptionErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <button onClick={handleSubmitBtnClick}>Submit</button>
    </div>
  );
};

export default CreateFeedback;
