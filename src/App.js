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

    return (
    <div>
      {location.pathname.slice(0,6) === "/admin" && <AdminNavbar />}
      {location.pathname.slice(0,9) === "/employee" && <EmployeeNavbar />}
      {location.pathname.slice(0,9) === "/employer" && <EmployerNavbar />}
      {(location.pathname.slice(0,6) !== "/admin" && location.pathname.slice(0,9) !== "/employer" && location.pathname.slice(0,9) !== "/employee")  && <CandidateNavbar />}
      <Switch>
      <Route path="/admin/send-feedback">
          <CreateFeedback />
        </Route>
        <Route path="/admin/review-application">
        <div className='d-flex-chat'>
          <ReviewApplication />
          <Chatroom />
        </div>
        </Route>
        <Route path="/admin/view-applicants">
          <Applicants />
        </Route>
        <Route path="/admin/job/edit">
          <EditJob />
        </Route>
        <Route path="/admin/job-description">
          <JobDescription />
        </Route>
        <Route path="/admin/about">
          <About />
        </Route>
        <Route path="/admin/list/employers">
          <AdminEmployersList />
        </Route>
        <Route path="/admin/list/candidates">
          <AdminCandidatesList />
        </Route>
      <Route path="/admin/login">
          <AdminLogin />
        </Route>
        <Route path="/admin">
          <AdminPanel />
        <h3 className='candidate-content-heading'>Listed Jobs</h3>
          <Jobs />
        </Route>
        <Route path="/employer/review-application">
          <ReviewApplication />
          <Feedback />
        </Route>
        <Route path="/employer/dashboard">
          <EmployerDashboard />
        </Route>
        <Route path="/employer/job/edit">
          <EditJob />
        </Route>
        <Route path="/employer/job-description">
          <JobDescription />
        </Route>        
        <Route path="/employer/signup">
          <EmployerSignup />
        </Route>
        <Route path="/employer/about">
          <About />
        </Route>
        <Route path="/employer/signup">
          <EmployerSignup />
        </Route>
        <Route path="/employer/login">
          <Login />
        </Route>
        <Route path="/employer/contact">
          <div className = "d-flex-contact">
          <Contact />
          <Faq />
            </div>
        </Route>
        <Route path="/employer/add/job">
          <CreateJob />
        </Route>
        <Route path="/employer">
        <div className="cta-d-flex">
          <div>
          <h3 className='employer-content-heading'>My Listed Jobs</h3>
          </div>
          <div>
            <button onClick={()=> history.push("/employer/add/job")}>Create New Job</button>
          </div>
        </div>
          <EmployerJobs />
        </Route>
        <Route path="/employee/send-feedback">
          <CreateFeedback />
        </Route>
        <Route path="/employee/review-application">
          <div className='d-flex-chat'>
          <ReviewApplication />
          <Chatroom />
          </div>
        </Route>
        <Route path="/employee/view-applicants">
          <Applicants />
        </Route>
        <Route path="/employee/job-description">
          <JobDescription />
        </Route>
        <Route path="/employee/login">
          <EmployeeLogin />
        </Route>
        <Route path="/employee/about">
          <About />
        </Route>
        <Route path="/employee">
        <h3 className='candidate-content-heading'>Listed Jobs</h3>
          <Jobs />
        </Route>
        <Route path="/contact">
          <div className="d-flex-contact">
          <Contact />
          <Faq/>
          </div>
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        <Route path="/review-application">
        <div className='d-flex-chat'>
          <ReviewApplication />
          <Chatroom />
          </div>
        </Route>
        <Route path="/profile/edit">
          <EditProfile />
        </Route>
        <Route path="/job-description">
          <JobDescription />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
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
