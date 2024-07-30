// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ResumeUpload from "./components/ResumeUpload";
import FormPage from "./components/FormPage";
import ThankYou from "./components/ThankYou";
import AdminLogin from "./components/AdminLogin";
import AdminWorkflow from "./components/AdminWorkflow";
import ShortlistedCandidates from "./components/ShortlistedCandidates";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<LandingPage />} />
        <Route path="/user/resume-upload" element={<ResumeUpload />} />
        <Route path="/user/form" element={<FormPage />} />
        <Route path="/user/thank-you" element={<ThankYou />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="workflow" element={<AdminWorkflow />} />
          <Route path="shortlisted" element={<ShortlistedCandidates />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
