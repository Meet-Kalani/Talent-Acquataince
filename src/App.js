import './App.scss';
import CandidateNavbar from './components/CandidateNavbar';
import AdminNavbar from './components/AdminNavbar';
import EmployeeNavbar from './components/EmployeeNavbar';
import EmployerNavbar from './components/EmployerNavbar';
import Login from './components/Login';
import Copyright from  './components/Copyright';
import Signup from './components/Signup';
import Jobs from './components/Jobs';
import Footer from './components/Footer';
import JobDescription from './components/JobDescription';
import About from './components/About';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import EditJob from './components/EditJob';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import Applicants from './components/Applicants';
import ReviewApplication from './components/ReviewApplication';
import CreateFeedback from './components/CreateFeedback';
import CreateJob from './components/CreateJob';
import EmployerDashboard from './components/EmployerDashboard';
import Chatroom from './components/Chatroom';
import SearchBar from './components/SearchBar';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import EmployeeLogin from './components/EmployeeLogin';
import AdminCandidatesList from './components/AdminCandidatesList';
import AdminEmployersList from './components/AdminEmployersList';
import EmployerSignup from './components/EmployerSignup';
import Contact from './components/Contact';
import EmployerJobs from './components/EmployerJobs';
import Faq from './components/Faq';
import { useLocation,Switch, Route, useHistory } from "react-router-dom";

function App() {
  const location = useLocation();
  const history = useHistory();
  console.log(location.pathname.slice(0,28))
    return (
    <div>
      {location.pathname.slice(0,25) === "/Talent-Acquataince/admin" && <AdminNavbar />}
      {location.pathname.slice(0,28) === "/Talent-Acquataince/employee" && <EmployeeNavbar />}
      {location.pathname.slice(0,28) === "/Talent-Acquataince/employer" && <EmployerNavbar />}
      {(location.pathname.slice(0,25) !== "/Talent-Acquataince/admin" && location.pathname.slice(0,28) !== "/Talent-Acquataince/employer" && location.pathname.slice(0,28) !== "/Talent-Acquataince/employee")  && <CandidateNavbar />}
      <Switch>
      <Route path="/Talent-Acquataince/admin/send-feedback">
          <CreateFeedback />
        </Route>
        <Route path="/Talent-Acquataince/admin/review-application">
        <div className='d-flex-chat'>
          <ReviewApplication />
          <Chatroom />
        </div>
        </Route>
        <Route path="/Talent-Acquataince/admin/view-applicants">
          <Applicants />
        </Route>
        <Route path="/Talent-Acquataince/admin/job/edit">
          <EditJob />
        </Route>
        <Route path="/Talent-Acquataince/admin/job-description">
          <JobDescription />
        </Route>
        <Route path="/Talent-Acquataince/admin/about">
          <About />
        </Route>
        <Route path="/Talent-Acquataince/admin/list/employers">
          <AdminEmployersList />
        </Route>
        <Route path="/Talent-Acquataince/admin/list/candidates">
          <AdminCandidatesList />
        </Route>
      <Route path="/Talent-Acquataince/admin/login">
          <AdminLogin />
        </Route>
        <Route path="/Talent-Acquataince/admin">
          <AdminPanel />
        <h3 className='candidate-content-heading'>Listed Jobs</h3>
          <Jobs />
        </Route>
        <Route path="/Talent-Acquataince/employer/review-application">
          <ReviewApplication />
          <Feedback />
        </Route>
        <Route path="/Talent-Acquataince/employer/dashboard">
          <EmployerDashboard />
        </Route>
        <Route path="/Talent-Acquataince/employer/job/edit">
          <EditJob />
        </Route>
        <Route path="/Talent-Acquataince/employer/job-description">
          <JobDescription />
        </Route>        
        <Route path="/Talent-Acquataince/employer/signup">
          <EmployerSignup />
        </Route>
        <Route path="/Talent-Acquataince/employer/about">
          <About />
        </Route>
        <Route path="/Talent-Acquataince/employer/signup">
          <EmployerSignup />
        </Route>
        <Route path="/Talent-Acquataince/employer/login">
          <Login />
        </Route>
        <Route path="/Talent-Acquataince/employer/contact">
          <div className = "d-flex-contact">
          <Contact />
          <Faq />
            </div>
        </Route>
        <Route path="/Talent-Acquataince/employer/add/job">
          <CreateJob />
        </Route>
        <Route path="/Talent-Acquataince/employer">
        <div className="cta-d-flex">
          <div>
          <h3 className='employer-content-heading'>My Listed Jobs</h3>
          </div>
          <div>
            <button onClick={()=> history.push("/Talent-Acquataince/employer/add/job")}>Create New Job</button>
          </div>
        </div>
          <EmployerJobs />
        </Route>
        <Route path="/Talent-Acquataince/employee/send-feedback">
          <CreateFeedback />
        </Route>
        <Route path="/Talent-Acquataince/employee/review-application">
          <div className='d-flex-chat'>
          <ReviewApplication />
          <Chatroom />
          </div>
        </Route>
        <Route path="/Talent-Acquataince/employee/view-applicants">
          <Applicants />
        </Route>
        <Route path="/Talent-Acquataince/employee/job-description">
          <JobDescription />
        </Route>
        <Route path="/Talent-Acquataince/employee/login">
          <EmployeeLogin />
        </Route>
        <Route path="/Talent-Acquataince/employee/about">
          <About />
        </Route>
        <Route path="/Talent-Acquataince/employee">
        <h3 className='candidate-content-heading'>Listed Jobs</h3>
          <Jobs />
        </Route>
        <Route path="/Talent-Acquataince/contact">
          <div className="d-flex-contact">
          <Contact />
          <Faq/>
          </div>
        </Route>
        <Route path="/Talent-Acquataince/feedback">
          <Feedback />
        </Route>
        <Route path="/Talent-Acquataince/review-application">
        <div className='d-flex-chat'>
          <ReviewApplication />
          <Chatroom />
          </div>
        </Route>
        <Route path="/Talent-Acquataince/profile/edit">
          <EditProfile />
        </Route>
        <Route path="/Talent-Acquataince/job-description">
          <JobDescription />
        </Route>
        <Route path="/Talent-Acquataince/about">
          <About />
        </Route>
        <Route path="/Talent-Acquataince/profile">
          <Profile />
        </Route>
        <Route path="/Talent-Acquataince/dashboard">
          <Dashboard />
        </Route>
        <Route path="/Talent-Acquataince/signup">
          <Signup />
        </Route>
        <Route path="/Talent-Acquataince/login">
          <Login />
        </Route>
        <Route path="/Talent-Acquataince/">
          <SearchBar />
        <h3 className='candidate-content-heading'>Jobs</h3>
          <Jobs />
        </Route>
      </Switch>
      <Footer />
      <Copyright /> 
    </div>
  );
}

export default App;
