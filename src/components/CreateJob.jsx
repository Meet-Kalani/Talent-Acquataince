import React, { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
const baseURL = "https://talent-acquataince.onrender.com";
// const baseURL = "http://localhost:5000";

const CreateJob = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [pay, setPay] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [skills, setSkills] = useState("");
  const [perks, setPerks] = useState("");
  const [description_about_designation, setDescription_about_designation] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [status, setStatus] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [designationErr, setDesignationErr] = useState(false);
  const [vacancyErr, setVacancyErr] = useState(false);
  const [payErr, setPayErr] = useState(false);
  const [experienceErr, setExperienceErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [tagsErr, setTagsErr] = useState(false);
  const [qualificationsErr, setQualificationsErr] = useState(false);
  const [statusErr, setStatusErr] = useState(false);
  const [skillsErr, setSkillsErr] = useState(false);
  const [perksErr, setPerksErr] = useState(false);
  const [description_about_designationErr, setDescription_about_designationErr] = useState(false);

  const handleSubmitBtnClick = () => {
    if (
      title &&
      description &&
      designation &&
      vacancy &&
      pay &&
      experience &&
      location &&
      tags &&
      qualifications &&
      status &&
      skills &&
      perks &&
      description_about_designation
    ) {
      axios
        .post(
          baseURL + "/employer/jobs",
          {
            title: title,
            description: description,
            designation: designation,
            vacancy: vacancy,
            pay: pay,
            experience: experience,
            location: location,
            tags: tags,
            qualifications: qualifications,
            status: status,
            skills:skills,
            perks:perks,
            description_about_designation:description_about_designation
          },
          {
            headers: {
              "x-access-token": window.localStorage.getItem("employer_token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          history.push('/Talent-Acquataince/employer');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!title) {
        setTitleErr(true);
      } else {
        setTitleErr(false);
      }
      if (!description) {
        setDescriptionErr(true);
      } else {
        setDescriptionErr(false);
      }
      if (!designation) {
        setDesignationErr(true);
      } else {
        setDesignationErr(false);
      }
      if (!vacancy) {
        setVacancyErr(true);
      } else {
        setVacancyErr(false);
      }
      if (!pay) {
        setPayErr(true);
      } else {
        setPayErr(false);
      }
      if (!experience) {
        setExperienceErr(true);
      } else {
        setExperienceErr(false);
      }
      if (!location) {
        setLocationErr(true);
      } else {
        setLocationErr(false);
      }
      if (!tags) {
        setTagsErr(true);
      } else {
        setTagsErr(false);
      }
      if (!qualifications) {
        setQualificationsErr(true);
      } else {
        setQualificationsErr(false);
      }
      if (!status) {
        setStatusErr(true);
      } else {
        setStatusErr(false);
      }
      if (!skills) {
        setSkillsErr(true);
      } else {
        setSkillsErr(false);
      }
      if (!perks) {
        setPerksErr(true);
      } else {
        setPerksErr(false);
      }
      if (!description_about_designation) {
        setDescription_about_designationErr(true);
      } else {
        setDescription_about_designationErr(false);
      }
    }
  };

  return (
    <div id="create-job">
      <div>
        <p>Title</p>
        <input
          type="text"
          placeholder="Enter your title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleErr ? <span>This field cannot be empty.</span> : ""}
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
      <div>
        <p>designation</p>
        <input
          type="text"
          placeholder="Enter your designation"
          name="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        {designationErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Vacancy</p>
        <input
          type="text"
          placeholder="Enter your vacancy"
          name="vacancy"
          value={vacancy}
          onChange={(e) => setVacancy(e.target.value)}
        />
        <small>Note: Please enter vacancy in Number's only</small>
        {vacancyErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Pay</p>
        <input
          type="text"
          placeholder="Enter your pay"
          name="pay"
          value={pay}
          onChange={(e) => setPay(e.target.value)}
        />
        <small>Note: Please enter pay in Number's only</small>
        {payErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Experience</p>
        <input
          type="text"
          placeholder="Enter your experience"
          name="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <small>Note: Please enter experience in Number's only</small>
        {experienceErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Location</p>
        <input
          type="text"
          placeholder="Enter your location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {locationErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Tags</p>
        <input
          type="text"
          placeholder="Enter your tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <small>Note: Whenever you do space it will be counted as one tag(i.e. one tag => tag = one,tag)</small>
        {tagsErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Skills</p>
        <input
          type="text"
          placeholder="Enter your Skills"
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <small>Note: Whenever you do space it will be counted as one tag(i.e. one tag => tag = one,tag)</small>
        {skillsErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Perks</p>
        <input
          type="text"
          placeholder="Enter your Perks"
          name="perks"
          value={perks}
          onChange={(e) => setPerks(e.target.value)}
        />
        <small>Note: Whenever you do space it will be counted as one tag(i.e. one tag => tag = one,tag)</small>
        {perksErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Description about designation</p>
        <input
          type="text"
          placeholder="Enter your description about designation"
          name="description_about_designation"
          value={description_about_designation}
          onChange={(e) => setDescription_about_designation(e.target.value)}
        />
        {description_about_designationErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Qualifications</p>
        <input
          type="text"
          placeholder="Enter your qualifications"
          name="qualifications"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
        />
        {qualificationsErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Status</p>
        <input
          type="text"
          placeholder="Enter your status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        {statusErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <button onClick={handleSubmitBtnClick}>Submit</button>
    </div>
  );
};

export default CreateJob;
