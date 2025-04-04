import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  useEffect(() => {
    document.activeElement.blur(); // Clear any focus on page load
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    axios
      .post("http://localhost:3000/user/user_login", values)
      .then((result) => {
        console.log("Server response:", result.data);
        if (result.data.loginStatus) {
          setValues({ email: "", password: "" }); // Reset form
          setError(null);
          navigate("/home");
        } else {
          setError(result.data.error);
          emailRef.current.focus(); // Refocus on email after error
        }
      })
      .catch((err) => console.log("Login error:", err));
  };

  return (
    <div className="loginPage">
      <div className="loginForm">
        {error && <div className="text-danger">{error}</div>}
        <h2 className="text-center">User Login Page</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              autoComplete="off"
              autoFocus
              ref={emailRef}
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
              required
            />
          </div>
          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Log in
          </button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/user_signup");
              }}
            >
              Sign Up Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
