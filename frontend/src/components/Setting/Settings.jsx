import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import settingStyle from "./Settings.module.css";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignOutAlt } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();

  // Local state for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Local state for password visibility toggles
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send data to an API, Redux store, or any other state management
    console.log("Form Submitted with values:", {
      name,
      email,
      oldPassword,
      newPassword,
    });
  };

  // Logout function
  const handleLogout = () => {
    // Remove token & userId from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn")
    // Redirect to /login (or anywhere else)
    navigate("/login");
  };

  return (
    <div className={settingStyle.settingsContainer}>
      {/* Page title */}
      <h1 className={settingStyle.settingsTitle}>Settings</h1>

      {/* Form container */}
      <form onSubmit={handleSubmit} className={settingStyle.formContainer}>
        {/* Name field */}
        <div className={settingStyle.inputWrapper}>
          <span className={settingStyle.inputIcon}>
            <FaUser />
          </span>
          <input
            className={settingStyle.inputField}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Update Email field */}
        <div className={settingStyle.inputWrapper}>
          <span className={settingStyle.inputIcon}>
            <FaLock />
          </span>
          <input
            className={settingStyle.inputField}
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Old Password field */}
        <div className={settingStyle.inputWrapper}>
          <span className={settingStyle.inputIcon}>
            <FaLock />
          </span>
          <input
            className={settingStyle.inputField}
            type={oldPasswordVisible ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <span
            className={settingStyle.eyeIcon}
            onClick={() => setOldPasswordVisible((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {oldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* New Password field */}
        <div className={settingStyle.inputWrapper}>
          <span className={settingStyle.inputIcon}>
            <FaLock />
          </span>
          <input
            className={settingStyle.inputField}
            type={newPasswordVisible ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className={settingStyle.eyeIcon}
            onClick={() => setNewPasswordVisible((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Update Button */}
        <button type="submit" className={settingStyle.updateBtn}>
          Update
        </button>
      </form>

      {/* Log out Button */}
      <div className={settingStyle.logoutContainer}>
        <button 
          className={settingStyle.logoutBtn}
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
