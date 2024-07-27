import React, { useState } from "react";
import './login.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    data = { userId: credentials.email, password: credentials.password };

    const response = await fetch("http://localhost:8000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert('Invalid Credentials');
    }

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // localStorage.setItem('token', JSON.stringify(json.authToken));
      // props.showAlert("Logged in Successfully", "success")
      const { accessToken, refreshToken } = json.data;

      // Set cookies in document.cookie
      document.cookie = `accessToken=${accessToken}; path=/;`;
      document.cookie = `refreshToken=${refreshToken}; path=/;`;
      console.log("Logged in Successfully");
      navigate('/home');

    }
  }
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="main456">

      <Navbar/>
      {/* <header>JIIT Placement Portal</header> */}
      {/* <div className="container1 container-fluid">  */}
      <div className="container1"> 
        <h2 className="admin fs-4 text-start">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 my-4">
            <label htmlFor="email" className="ftext">Email:</label>
            <div className="inpbox">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <label htmlFor="password" className="ftext">Password:</label>
            <div className="inpbox">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary my-3 mt-5 signin" >
            Sign in
          </button>
          <div className="text-center">
            <Link to="/slogin" className="link text-muted">Sign in as Student?</Link><br /><br />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
