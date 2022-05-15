import React,{useState} from 'react';
import axios from "axios";
import{useHistory} from "react-router-dom";
const baseURL = "https://talent-acquataince.herokuapp.com";

const Contact = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [message, setMessage] = useState("");
    const [nameErr, setNameErr] = useState(false);
    const [mailErr, setMailErr] = useState(false);
    const [messageErr, setMessageErr] = useState(false);

    const handleSubmitBtnClick = ()=>{
        if(name && mail && message){
          axios.post(baseURL+"/candidate/contact",{
              name:name,
              mail:mail,
              message:message
          })
        .then((res)=>{
            history.push('/');
        })
        .catch((err)=>{
            console.log(err);
        })
        } else{
          if(!name){
            setNameErr(true);
          } else{
            setNameErr(false);
          }
          if(!mail){
            setMailErr(true);
          } else{
            setMailErr(false);
          }
          if(!message){
            setMessageErr(true);
          } else{
            setMessageErr(false);
          }
        }
    }

  return (
    <div id="contact" className="wow vision slideInLeft">
        <div>
        <p>Name</p>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Mail</p>
        <input
          type="text"
          placeholder="Enter your mail"
          name="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        {mailErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Message</p>
        <textarea
          name="message"
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        {messageErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      
        <button onClick={handleSubmitBtnClick}>Submit</button> 
      
    </div>
  )
}

export default Contact