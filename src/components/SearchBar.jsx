import React, { useState } from "react";
import axios from "axios";
import searchIcon from "../imgs/search-icon.png";
import Job from './Job';
const baseURL = "https://talent-acquataince.herokuapp.com";
// const baseURL = "http://localhost:5000";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [loadHeading, setLoadHeading] = useState(false);

  const handleSearchBtn = () => {
    if(search !== ""){
      axios
      .get(baseURL + "/candidate/jobs/search/"+search)
      .then((res) => {
        setSearchedJobs(res.data);
        setLoadHeading(true)
      })
      .catch((err) => {
        console.log(err)
      });
    } else {
      setLoadHeading(false);
    }
  };  

  return (
    <>
    <div id="search-bar">
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button>
        <img src={searchIcon} onClick={handleSearchBtn} alt="search icon" />
      </button>
    </div>
    {loadHeading && <p className='candidate-content-heading'>Searched Job: "{search}"</p> }
    {(loadHeading) && searchedJobs.map(job=>{
        return <Job job={job} key={job._id} />
      })} 
    </>
  );
};

export default SearchBar;           
