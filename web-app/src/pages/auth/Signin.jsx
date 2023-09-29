import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SCLOGO from "../../assets/img/sc-logo.png";
import './sign.css';
const Signin = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });
  const [hideerro, sethideerro] = useState(true);
  const [loginErro, setloginErro] = useState(true);
  const handleLogin = (e) => {
    e.preventDefault();



    // Validate input fields
    const errors = {};
    if (!username) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      sethideerro(false);
      setFormErrors(errors);
      return; // Prevent form submission if there are errors
    }

    // Create a FormData object to send username and password
    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("Password", password);

    // Make an API POST request with the correct content type
    axios.post("https://localhost:7260/api/UserToken/gettoken", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set the correct content type
      },
    })
      .then((response) => {
        // Assuming the API response contains a 'token' field with the JWT token
        const jwtToken = response.data;
        console.log("vfbf");
        // Save the JWT token in local storage
        localStorage.setItem("jwtToken", jwtToken);

        // Redirect to another page or perform other actions after successful login
        history.push("/user/dashboard");
      })
      .catch((error) => {
        setloginErro(false);
        console.error("Login failed:", error);
        setError("Login failed. Please check your Username and password.");
      });
  };


  // Define the handleUsername function to respond to changes in the username input field
  const handleUsernameChanged = (event) => {
    setloginErro(true);
    sethideerro(true);
    setUsername(event.target.value);
  };



  // Define the handleUsername function to respond to changes in the username input field
  const handlePasswordChanged = (event) => {
    setloginErro(true);
    sethideerro(true);
    setPassword(event.target.value);

    // You can add any additional logic related to username validation here
  };

  return (
    <React.Fragment>
      <div className="auth-header">
        <div className="auth-header-logo">
          <img src={SCLOGO} alt="" className="auth-header-logo-img" />
        </div>
        <h1 className="auth-header-title">User Signin</h1>
        <p className="auth-header-subtitle">
          Sign-in to your account and start the adventure
        </p>
      </div>
      <div className="auth-body">
        <form className="auth-form-validation" onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="username" className="input-label">
              User Name
            </label>
            <input
              type="text"
              className="input-control"
              id="username"
              value={username}
              onChange={handleUsernameChanged}
              placeholder="enter username"
              autoComplete="off"
              required
            /> {!hideerro && (
              <span className="error-message">{formErrors.username}</span>
            )}

          </div>
          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              className="input-control"
              id="password"
              value={password}
              onChange={handlePasswordChanged}
              placeholder="Password"
              autoComplete="off"
              required
            /> {!hideerro && (
              <span className="error-message">{formErrors.password}</span>
            )}

            {!loginErro && (
              <span className="login-error-message">{error}</span>
            )}
          </div>
          <div>
          <button onClick={handleLogin} className="btn-submit">
            Sign in
          </button>
          </div>
          
        </form>
        <p className="text-center">
          New on our platform?{" "}
          <Link to={"/auth/signup"} className="link-text-center">
            Create an account here
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Signin;
