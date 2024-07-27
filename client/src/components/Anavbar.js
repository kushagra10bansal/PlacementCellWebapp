import React from "react";
// import { Link } from "react-router-dom";
import "./login.css";
import "./Anavbar.css";
import { Link, useLocation } from "react-router-dom";

export default function Anavbar() {
  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/logout`, {
        method: "DELETE",
        credentials: "include",
        header: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.success) {
        alert("Logged out successfully!");
      } else {
        console.log("fetching unsuccessful");
      }
    } catch (error) {
      console.log("error fetching company", error);
    }
  };
  const location = useLocation();
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="jiitlogo">
            <i className="bx bxl-mailchimp"></i>
          </div>
          <Link className="navbar-brand bebas-neue-regular" to="/home">
            JIIT T&P
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li
                className={`nav-item  ${
                  location.pathname === "/home" ? "active" : ""
                }`}
              >
                <Link className="nav-link" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/labout">
                  About
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/addstudent" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/addstudent">
                  Add Student
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/addcompany" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/addcompany">
                  Add Company
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/ablog" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/ablog">
                  Add Blog
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/vblog" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/avblog">
                  View Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-nav ml-auto">
            <li className="nav-item" id="logout">
              <Link to="/logout">
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-secondary btn1"
                >
                  Logout
                </button>
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}
