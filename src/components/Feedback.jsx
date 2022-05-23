import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const Feedback = () => {
  const location = useLocation();
  const [actualFeedback, setActualFeedback] = useState({})

  useEffect(() => {
    axios
      .get(baseURL + "/candidate/profile/" + location.state.candidate_id)
      .then((res) => {
        res.data.feedbacks.map(feedback => {
          if(feedback.job_id === location.state.job_id){
            setActualFeedback(feedback);
            return feedback
          }
          return true;
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state.candidate_id,location.state.job_id])
  
  return (
    <div id='feedback' className="wow vision zoomInDown">
        <div className="feedback-short">
        <h3>Overall Feedback</h3>
        <p>{actualFeedback.overall_feedback}</p>
        </div>
        <div className="feedback-long">
        <h3>Feedback</h3>
        <p>{actualFeedback.description}</p>
        </div>
    </div>
  )
}

export default Feedback