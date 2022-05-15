import React from "react";
import LoginImg from "../imgs/login.png";

const About = () => {
  return (
    <div id="about" className="wow vision zoomInDown">
      <div className="about-content">
        <h3>About</h3>
        <div>
        <img src={LoginImg} alt="Owner" />
        </div>
        <p>
          Talent Acquaintance is incorporated to provide various HR outsourcing
          solutions. Talent Acquaintance delivers integrated solutions for human
          resource management as per the needs of industry. Talent Acquaintance
          involves in recruitments, recruitment process outsourcing, HR
          outsourcing solutions and Payroll processing & compliance management
          through its various divisions.
        </p>
        <p>
          Since its inception in 2019, We are Recruiting staff in BPO/KPO & IT
          sector. Our Head office at Ahmedabad and Regional office at Rajkot.
        </p>
      </div>
      
    </div>
  );
};

export default About;
