import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
const baseURL = "https://talent-acquataince.onrender.com";
// const baseURL = "http://localhost:5000";

const EditProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [bio, setBio] = useState("");
  const [profile_picture, setProfile_picture] = useState({});
  const [resume, setResume] = useState({});
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");
  const [SSC, setSSC] = useState("");
  const [SSC_year, setSSC_year] = useState("");
  const [HSC, setHSC] = useState("");
  const [HSC_year, setHSC_year] = useState("");
  const [UG_course_name, setUG_course_name] = useState("");
  const [UG_institute_name, setUG_institute_name] = useState("");
  const [UG_university, setUG_university] = useState("");
  const [UG_percentage, setUG_percentage] = useState("");
  const [UG_passing_year, setUG_passing_year] = useState("");
  const [PG_course_name, setPG_course_name] = useState("");
  const [PG_institute_name, setPG_institute_name] = useState("");
  const [PG_university, setPG_university] = useState("");
  const [PG_percentage, setPG_percentage] = useState("");
  const [PG_passing_year, setPG_passing_year] = useState("");
  const [profile_picture_URL, setProfile_picture_URL] = useState({});
  const [resume_URL, setResume_URL] = useState({});
  const [nameErr, setNameErr] = useState(false);
  const [ageErr, setAgeErr] = useState(false);
  const [placeErr, setPlaceErr] = useState(false);
  const [bioErr, setBioErr] = useState(false);
  const [profile_pictureErr, setProfile_pictureErr] = useState(false);
  const [resumeErr, setResumeErr] = useState(false);
  const [contactErr, setContactErr] = useState(false);
  const [skillsErr, setSkillsErr] = useState(false);
  const [SSCErr, setSSCErr] = useState(false);
  const [SSC_yearErr, setSSC_yearErr] = useState(false);
  const [HSCErr, setHSCErr] = useState(false);
  const [HSC_yearErr, setHSC_yearErr] = useState(false);
  const [UG_course_nameErr, setUG_course_nameErr] = useState(false);
  const [UG_institute_nameErr, setUG_institute_nameErr] = useState(false);
  const [UG_universityErr, setUG_universityErr] = useState(false);
  const [UG_percentageErr, setUG_percentageErr] = useState(false);
  const [UG_passing_yearErr, setUG_passing_yearErr] = useState(false);
  const [PG_course_nameErr, setPG_course_nameErr] = useState(false);
  const [PG_institute_nameErr, setPG_institute_nameErr] = useState(false);
  const [PG_universityErr, setPG_universityErr] = useState(false);
  const [PG_percentageErr, setPG_percentageErr] = useState(false);
  const [PG_passing_yearErr, setPG_passing_yearErr] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(true);
  const [doneProfilePicture, setDoneProfilePicture] = useState(false);
  const [doneResume, setDoneResume] = useState(false);

  useEffect(() => {
    axios
      .get(baseURL + "/candidate/profile/" + location.state.profile_id, {
        headers: {
          "x-access-token": window.localStorage.getItem("admin_token"),
        },
      })
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setPlace(res.data.place);
        setBio(res.data.bio);
        setContact(res.data.contact);
        let skillsStr = "";
        res.data.skills.map((skill) => {
          return (skillsStr = skillsStr + skill + " ");
        });
        setSkills(skillsStr);
        setSSC(res.data.SSC);
        setSSC_year(res.data.SSC_year);
        setHSC(res.data.HSC);
        setHSC_year(res.data.HSC_year);
        setUG_course_name(res.data.UG_course_name);
        setUG_institute_name(res.data.UG_institute_name);
        setUG_passing_year(res.data.UG_passing_year);
        setUG_university(res.data.UG_university);
        setUG_percentage(res.data.UG_percentage);
        setPG_course_name(res.data.PG_course_name);
        setPG_institute_name(res.data.PG_institute_name);
        setPG_passing_year(res.data.PG_passing_year);
        setPG_percentage(res.data.PG_percentage);
        setPG_university(res.data.PG_university);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state.profile_id]);

  const handleProfilePictureUpload = () => {
    const profile_picture_upload = new FormData();
    profile_picture_upload.append("file", profile_picture);
    profile_picture_upload.append("upload_preset", "cloudinary_images");
    profile_picture_upload.append("folder", "job-portal-profile-picture");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/meetkalani/image/upload",
        profile_picture_upload
      )
      .then((response) => {
        setProfile_picture_URL({
          url: response.data.url,
          public_id: response.data.public_id,
        });
        setDoneProfilePicture(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleResumeUpload = () => {
    const resume_upload = new FormData();
    resume_upload.append("file", resume);
    resume_upload.append("upload_preset", "cloudinary_images");
    resume_upload.append("folder", "job-portal-resume");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/meetkalani/image/upload",
        resume_upload
      )
      .then((response) => {
        setResume_URL({
          url: response.data.url,
          public_id: response.data.public_id,
        });
        setDoneResume(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProfileBtnClick = () => {
    if (
      doneProfilePicture &&
      doneResume &&
      name &&
      age &&
      place &&
      bio &&
      profile_picture &&
      resume &&
      contact &&
      skills &&
      SSC &&
      SSC_year &&
      HSC &&
      HSC_year &&
      UG_course_name &&
      UG_institute_name &&
      UG_university &&
      UG_percentage &&
      UG_passing_year &&
      PG_course_name &&
      PG_institute_name &&
      PG_university &&
      PG_percentage &&
      PG_passing_year
    ) {
      axios
        .put(
          baseURL + "/candidate/profile/" + location.state.profile_id + "/edit",
          {
            name: name,
            age: age,
            place: place,
            bio: bio,
            profile_picture: profile_picture_URL,
            resume: resume_URL,
            contact: contact,
            skills: skills,
            SSC: SSC,
            SSC_year: SSC_year,
            HSC: HSC,
            HSC_year: HSC_year,
            UG_course_name: UG_course_name,
            UG_university: UG_university,
            UG_institute_name: UG_institute_name,
            UG_passing_year: UG_passing_year,
            UG_percentage: UG_percentage,
            PG_course_name: PG_course_name,
            PG_university: PG_university,
            PG_institute_name: PG_institute_name,
            PG_passing_year: PG_passing_year,
            PG_percentage: PG_percentage,
          },
          {
            headers: {
              "x-access-token": window.localStorage.getItem("candidate_token"),
            },
          }
        )
        .then((response) => {
          history.push("/Talent-Acquataince/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoadSubmit(true);
      if (!name) {
        setNameErr(true);
      } else {
        setNameErr(false);
      }
      if (!age) {
        setAgeErr(true);
      } else {
        setAgeErr(false);
      }
      if (!place) {
        setPlaceErr(true);
      } else {
        setPlaceErr(false);
      }
      if (!bio) {
        setBioErr(true);
      } else {
        setBioErr(false);
      }
      if (!profile_picture) {
        setProfile_pictureErr(true);
      } else {
        setProfile_pictureErr(false);
      }
      if (!resume) {
        setResumeErr(true);
      } else {
        setResumeErr(false);
      }
      if (!contact) {
        setContactErr(true);
      } else {
        setContactErr(false);
      }
      if (!skills) {
        setSkillsErr(true);
      } else {
        setSkillsErr(false);
      }
      if (!SSC) {
        setSSCErr(true);
      } else {
        setSSCErr(false);
      }
      if (!SSC_year) {
        setSSC_yearErr(true);
      } else {
        setSSC_yearErr(false);
      }
      if (!HSC) {
        setHSCErr(true);
      } else {
        setHSCErr(false);
      }
      if (!HSC_year) {
        setHSC_yearErr(true);
      } else {
        setHSC_yearErr(false);
      }
      if (!UG_course_name) {
        setUG_course_nameErr(true);
      } else {
        setUG_course_nameErr(false);
      }
      if (!UG_institute_name) {
        setUG_institute_nameErr(true);
      } else {
        setUG_institute_nameErr(false);
      }
      if (!UG_university) {
        setUG_universityErr(true);
      } else {
        setUG_universityErr(false);
      }
      if (!UG_percentage) {
        setUG_percentageErr(true);
      } else {
        setUG_percentageErr(false);
      }
      if (!UG_passing_year) {
        setUG_passing_yearErr(true);
      } else {
        setUG_passing_yearErr(false);
      }
      if (!PG_course_name) {
        setPG_course_nameErr(true);
      } else {
        setPG_course_nameErr(false);
      }
      if (!PG_institute_name) {
        setPG_institute_nameErr(true);
      } else {
        setPG_institute_nameErr(false);
      }
      if (!PG_university) {
        setPG_universityErr(true);
      } else {
        setPG_universityErr(false);
      }
      if (!PG_percentage) {
        setPG_percentageErr(true);
      } else {
        setPG_percentageErr(false);
      }
      if (!PG_passing_year) {
        setPG_passing_yearErr(true);
      } else {
        setPG_passing_yearErr(false);
      }
    }
  };

  return (
    <div id="edit-profile" className="wow vision zoomInDown">
      <h4>Basic Information</h4>
      <div className="d-flex splitter">
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
          <p>Age</p>
          <input
            type="text"
            placeholder="Enter your age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {ageErr ? <span>This field cannot be empty.</span> : ""}
        </div>
      </div>
      <div>
        <p>Place</p>
        <input
          type="text"
          placeholder="Enter your place"
          name="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        {placeErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Bio</p>
        <textarea
          name="bio"
          cols="30"
          rows="10"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        {bioErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <label htmlFor="image">Profile Picture</label>
        <input
          className="profile_picture"
          type="file"
          name="profile_picture"
          onChange={(e) => setProfile_picture(e.target.files[0])}
        />
        <button onClick={handleProfilePictureUpload}>Upload</button>
        {profile_pictureErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Contact</p>
        <input
          type="text"
          placeholder="Enter your contact"
          name="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        {contactErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Skills</p>
        <input
          type="text"
          placeholder="Enter your skills"
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        {skillsErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <label htmlFor="image">Resume / CV</label>
        <input
          className="resume"
          type="file"
          name="resume"
          onChange={(e) => setResume(e.target.files[0])}
        />
        <button onClick={handleResumeUpload}>Upload</button>
        {resumeErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <h4>Education Information</h4>
      <div className="d-flex splitter">
        <div>
          <p>SSC Result</p>
          <input
            type="text"
            placeholder="Enter your SSC result"
            name="SSC"
            value={SSC}
            onChange={(e) => setSSC(e.target.value)}
          />
          {SSCErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <p>SSC Year</p>
          <input
            type="text"
            placeholder="Enter your SSC year"
            name="SSC_year"
            value={SSC_year}
            onChange={(e) => setSSC_year(e.target.value)}
          />
          {SSC_yearErr ? <span>This field cannot be empty.</span> : ""}
        </div>
      </div>
      <div className="d-flex splitter">
        <div>
          <p>HSC Result</p>
          <input
            type="text"
            placeholder="Enter your HSC result"
            name="HSC"
            value={HSC}
            onChange={(e) => setHSC(e.target.value)}
          />
          {HSCErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <p>HSC Year</p>
          <input
            type="text"
            placeholder="Enter your HSC year"
            name="HSC_year"
            value={HSC_year}
            onChange={(e) => setHSC_year(e.target.value)}
          />
          {HSC_yearErr ? <span>This field cannot be empty.</span> : ""}
        </div>
      </div>
      <div>
        <p>Under Graduation Course Name</p>
        <input
          type="text"
          placeholder="Enter your under graduation course name"
          name="UG_course_name"
          value={UG_course_name}
          onChange={(e) => setUG_course_name(e.target.value)}
        />
        {UG_course_nameErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Under Graduation Institute Name</p>
        <input
          type="text"
          placeholder="Enter your under graduation institute name"
          name="UG_institute_name"
          value={UG_institute_name}
          onChange={(e) => setUG_institute_name(e.target.value)}
        />
        {UG_institute_nameErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Under Graduation University Name</p>
        <input
          type="text"
          placeholder="Enter your under graduation university name"
          name="UG_university_name"
          value={UG_university}
          onChange={(e) => setUG_university(e.target.value)}
        />
        {UG_universityErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div className="d-flex splitter">
        <div>
          <p>Under Graduation Result</p>
          <input
            type="text"
            placeholder="Enter your under graduation result"
            name="UG_percentage"
            value={UG_percentage}
            onChange={(e) => setUG_percentage(e.target.value)}
          />
          {UG_percentageErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <p>Under Graduation Completion Year</p>
          <input
            type="text"
            placeholder="Enter your under graduation completion year"
            name="UG_passing_year"
            value={UG_passing_year}
            onChange={(e) => setUG_passing_year(e.target.value)}
          />
          {UG_passing_yearErr ? <span>This field cannot be empty.</span> : ""}
        </div>
      </div>

      <div>
        <p>Post Graduation Course Name</p>
        <input
          type="text"
          placeholder="Enter your post graduation course name"
          name="PG_course_name"
          value={PG_course_name}
          onChange={(e) => setPG_course_name(e.target.value)}
        />
        {PG_course_nameErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Post Graduation Institute Name</p>
        <input
          type="text"
          placeholder="Enter your post graduation institute name"
          name="PG_institute_name"
          value={PG_institute_name}
          onChange={(e) => setPG_institute_name(e.target.value)}
        />
        {PG_institute_nameErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div>
        <p>Post Graduation University Name</p>
        <input
          type="text"
          placeholder="Enter your post graduation university name"
          name="PG_university_name"
          value={PG_university}
          onChange={(e) => setPG_university(e.target.value)}
        />
        {PG_universityErr ? <span>This field cannot be empty.</span> : ""}
      </div>
      <div className="d-flex splitter">
        <div>
          <p>Post Graduation Result</p>
          <input
            type="text"
            placeholder="Enter your post graduation result"
            name="PG_percentage"
            value={PG_percentage}
            onChange={(e) => setPG_percentage(e.target.value)}
          />
          {PG_percentageErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <p>Post Graduation Completion Year</p>
          <input
            type="text"
            placeholder="Enter your post graduation completion year"
            name="PG_passing_year"
            value={PG_passing_year}
            onChange={(e) => setPG_passing_year(e.target.value)}
          />
          {PG_passing_yearErr ? <span>This field cannot be empty.</span> : ""}
        </div>
      </div>

      <div>
        {loadSubmit ? (
          <button onClick={handleUpdateProfileBtnClick}>Update Profile</button>
        ) : (
          <center>
            <p>Hold on! Redirecting...</p>
          </center>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
