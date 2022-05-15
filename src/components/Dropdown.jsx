import React,{useState} from "react";
import DownArrow from "../imgs/down-arrow.png";

const Dropdown = (props) => {
    const [toggle, setToggle] = useState(true);

  return (
    <div id="dropdown">
      <div className="dropdown">
        <h4>{props.title}</h4>
        {
            toggle &&
            <div className="dropdown-content">
                <p>{props.description}</p>
            </div>
        }
      </div>
      <div>
        <img src={DownArrow} alt="drop down arrow" onClick={()=>setToggle(!toggle)} />
      </div>
    </div>
  );
};

export default Dropdown;
