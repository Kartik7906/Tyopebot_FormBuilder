import React, { useState } from "react";
import styles from "./Signup.module.css";
import googleIcon from "../../images/Google_Icon.svg";
import triangle from "../../images/Triangle.svg";
import Ellipse1 from "../../images/Ellipse1.svg";
import Ellipse2 from "../../images/Ellipse2.svg";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { register } from "../../Services/index";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false); // Tracks error state

  const handleregister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(true); // Set error if passwords don't match
      return;
    }

    setError(false); // Reset error if passwords match
    const res = await register(formData);
    if (res.status === 201) {
      alert("User created successfully");
      navigate("/login");
    } else {
      alert("Something went wrong");
      console.log(res);
    }
  };

  return (
    <div className={styles.logincontainer}>
      {/* Back button section */}
      <div className={styles.backbutton}>
        <Link to={"/login"}>
          <button>
            <IoArrowBackSharp />
          </button>
        </Link>
      </div>
      {/* Back button section ends here */}

      {/* Form starts here */}
      <form onSubmit={handleregister} className={styles.loginform}>
        <div className={styles.loginformcontainer}>
          <div className={styles.loginformheader}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter a Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.loginformheader}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter an Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.loginformheader}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a Password"
              value={formData.password}
              className={error ? styles.wrongbtndesign : ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.loginformheader}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={formData.confirmPassword}
              className={error ? styles.wrongbtndesign : ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          {error && (
            <p className={styles.errorMsg}>
              Enter the same password in both fields.
            </p>
          )}
          <div className={styles.loginformfooter}>
            <button type="submit" className={styles.loginbtn}>
              Sign Up
            </button>
          </div>
          <span>OR</span>
          <button className={styles.googleloginbtn}>
            <img src={googleIcon} alt="" />
            Sign In with Google
          </button>
          <p className={styles.loginformfooterpara}>
            Already have an account?{" "}
            <Link to={"/login"}>
              <span>Login</span>
            </Link>
          </p>
        </div>
      </form>
      {/* Form ends here */}

      <img src={Ellipse2} alt="" className={styles.Ellipse2} />
      <img src={Ellipse1} alt="" className={styles.Ellipse1} />
      <img src={triangle} alt="" className={styles.triangle} />
    </div>
  );
};

export default Signup;
