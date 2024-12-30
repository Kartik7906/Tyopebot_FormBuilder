import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LoginPage/Login";
import Signup from "./components/SignupPage/Signup";
import Dashboard from "./components/FormDashboard/Dashboard";
import Settings from "./components/Setting/Settings";
import Workspace from "./components/Wokspace/Workspace";
import Response from "./components/Response/Response";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [userId, setUserId] = useState(null);

  const handleLogin = (id) =>{
    setUserId(id);
    console.log("Login button clicked")
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Signup />} />

        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<Dashboard userId={userId} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/response" element={<Response />} />
          <Route path="/workspace" element={<Workspace userId={userId}/>} />
        {/* </Route> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
