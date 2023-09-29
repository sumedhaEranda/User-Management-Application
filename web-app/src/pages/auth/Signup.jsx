import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SCLOGO from "../../assets/img/sc-logo.png";

const Signup = () => {
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError("");
    setFormErrors({
      fullName: "",
      password: "",
      confirmPassword: "",
    });

    // Validate input fields
    const errors = {};

    if (!fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Prevent form submission if there are errors
    }

    // Create a FormData object to send user registration data
    const formData = new FormData();
    formData.append("UserName", fullName);
    formData.append("Password", password);
    console.log(formData);
    // Make an API POST request for user registration
    axios.post("https://localhost:7260/api/UserToken/UserRejister", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        // Handle successful registration, you can redirect to a login page or do other actions
        history.push("/auth/signin");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setError("Registration failed. alreday have user account.");
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
      <div className="auth-header">
        <div className="auth-header-logo">
          <img src={SCLOGO} alt="" className="auth-header-logo-img" />
        </div>
        <h1 className="auth-header-title">Create Account</h1>
        <p className="auth-header-subtitle">Create your account and be part of us</p>
      </div>
      <div className="auth-body">
        <form className="auth-form-validation" onSubmit={handleSignup}>
          <div className="input-field">
            <label htmlFor="full-name" className="input-label">
              Your Name
            </label>
            <input
              type="text"
              className="input-control"
              id="fullname"
              placeholder="Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="off"
              required
            />
            {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="input-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password" className="input-label">
              Re-Confirmation Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="input-control"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              required
            />
            {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
          </div>
          <button type="button" onClick={togglePasswordVisibility} className="input-control">
              {showPassword ? "Hide" : "Show"} Password
            </button>
          {error && <p className="login-error-message">{error}</p>}
          <div className="vertical-space" >
          <button type="submit" className="btn-submit">
            Create account
          </button>
          </div>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/auth/signin"} className="link-text-center">
            Sign in instead
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Signup;
