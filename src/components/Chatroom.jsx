import React,{useState,useEffect} from 'react';
import SendBtn from "../imgs/send-btn.png";
import io from 'socket.io-client';
import{useLocation} from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
const baseURL = "https://talent-acquataince.onrender.com";
// const baseURL = "http://localhost:5000";

const socket = io.connect('https://talent-acquataince.onrender.com');
// const socket = io.connect('http://localhost:5000');

const Chatroom = () => {
const [msg, setMsg] = useState("")
  const [chatroom_id, setChatroom_id] = useState("");
  const location = useLocation();
  const [messageList, setMessageList] = useState([]);

  useEffect(()=>{
    axios.get(baseURL + '/candidate/chatroom/'+location.state.candidate_id,{
      headers:{
        'x-access-token':window.localStorage.getItem('candidate_token'),
      }
    })
    .then(res=>{
      if(res.data.length > 0){
        res.data.map(data => {
          if(location.state.candidate_id === data.candidate_id || location.state.job_id === data.job_id){
            socket.emit("join_room",data._id);
            setChatroom_id(data._id);
          }
          return true;
        })
      } else{
        axios.get(`${baseURL}/candidate/create-chatroom/${location.state.job_id}`,{
          headers:{
            'x-access-token':window.localStorage.getItem('candidate_token'),
          }
        })
        .then((res)=>{
          console.log('1');
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  },[location.state.candidate_id,location.state.job_id])

  useEffect(() => {
    socket.on('receive_message',(data)=>{
      setMessageList((list)=>[...list,data])
    })
  }, [])
  

    const sendMessage = async() => {
      if(msg !== "" && location.pathname === "/review-application"){
        const msgData = {
          msg:msg,
          room:chatroom_id,
          author: location.state.candidate_id,
          time: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit('send_message',msgData);
        setMessageList((list)=>[...list,msgData]);
      } else if(msg !== "" && location.pathname === '/employee/review-application') {
        let author_id = jwt_decode(window.localStorage.getItem('employee_token'));
        const msgData = {
          msg:msg,
          room:chatroom_id,
          author: author_id.credentials.userID,
          time: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit('send_message',msgData);
        setMessageList((list)=>[...list,msgData])
      } else if(msg !== "" && location.pathname === "/admin/review-application") {
        let author_id = jwt_decode(window.localStorage.getItem('admin_token'))
        const msgData = {
          msg:msg,
          room:chatroom_id,
          author: author_id.credentials.userID,
          time: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit('send_message',msgData);
        setMessageList((list)=>[...list,msgData]);
      }
    }

    return (
    <div id="chatroom" className="wow vision slideInRight">
        <div className="chatroom-heading">
            <h3>Chatroom</h3>
        </div>
        <div className="chatroom-content">
          {
            messageList.map(messageContent => {
              return (
                <div className="message-box-holder">
                  <div className={messageContent.author === jwt_decode(window.localStorage.getItem('candidate_token')).credentials.userID ?"message-box" : "message-box message-partner"}>
                    <p className="chat-text">{messageContent.msg}</p>
                    <span className="chat-time">{messageContent.time}</span>
                  </div>
                </div>
              )
            })
          }        
        </div>
        <div className="chatroom-input">
            <input placeholder="Enter your message" typt="text" onChange={e => setMsg(e.target.value)} />
            <img src={SendBtn} onClick={sendMessage} alt="img" />
        </div>
    </div>
  )
}

export default Chatroom