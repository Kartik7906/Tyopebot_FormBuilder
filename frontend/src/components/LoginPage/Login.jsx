// src/components/LoginPage/Login.js;
import React, { useState } from "react";
import styles from "./Login.module.css";
import { IoArrowBackSharp } from "react-icons/io5";
import googleIcon from "../../images/Google_Icon.svg";
import triangle from "../../images/Triangle.svg";
import Ellipse1 from "../../images/Ellipse1.svg";
import Ellipse2 from "../../images/Ellipse2.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Services/index";

const Login = ({onLogin}) => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginFormData);

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", data.userId);
        window.localStorage.setItem("username",data.username);
        console.log(data.userId);
        onLogin(data.userId);
        window.localStorage.setItem('isLoggedIn', 'true');
        navigate("/dashboard");
      } else {
        // If status != 200, show error message
        const errorData = await res.json();
        alert(errorData.message || "Something went wrong, please try again!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login, please try again.");
    }
  };

  return (
    <div className={styles.logincontainer}>
      {/* back button section */}
      <div className={styles.backbutton}>
        <Link to="/">
          <button>
            <IoArrowBackSharp />
          </button>
        </Link>
      </div>

      {/* login form */}
      <form onSubmit={handleLogin} className={styles.loginform}>
        <div className={styles.loginformcontainer}>
          <div className={styles.loginformheader}>
            <label>Email</label>
            <input
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  [e.target.name]: e.target.value,
                })
              }
              type="email"
              name="email"
              value={loginFormData.email}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.loginformheader}>
            <label>Password</label>
            <input
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  [e.target.name]: e.target.value,
                })
              }
              type="password"
              name="password"
              value={loginFormData.password}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className={styles.loginformfooter}>
            <button type="submit" className={styles.loginbtn}>
              Log In
            </button>
          </div>

          <span>OR</span>
          <button className={styles.googleloginbtn}>
            <img src={googleIcon} alt="" />
            Sign In with Google
          </button>
          <p>
            Don’t have an account ?
            <Link to="/register">
              <span>Register now</span>
            </Link>
          </p>
        </div>
      </form>

      <img src={Ellipse2} alt="" className={styles.Ellipse2} />
      <img src={Ellipse1} alt="" className={styles.Ellipse1} />
      <img src={triangle} alt="" className={styles.triangle} />
    </div>
  );
};

export default Login;
