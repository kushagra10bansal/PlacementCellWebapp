import React from "react";
import { Link } from "react-router-dom";
// import "./Navbar.css";
import "./Anavbar.css";

export default function Navbar() {
  return (
    <div>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="jiitlogo">
              <i className="bx bxl-mailchimp"></i>
            </div>
            <Link className="navbar-brand bebas-neue-regular" to="/">
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
                  className={`nav-item`}
                >
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li
                  className={`nav-item `}
                >
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li
                  className={`nav-item `}
                >
                  <Link className="nav-link" to="/login">
                    T&P Portal
                  </Link>
                </li>
                <li
                  className={`nav-item `}
                >
                  <Link className="nav-link" to="/team">
                    Team
                  </Link>
                </li>
                <li
                  className={`nav-item`}
                >
                  <Link className="nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item" id="logout">
                
              </li>
            </div>
          </div>
        </nav>
      </div>
      {/* <div className="bg-img">
        <div className="container" id="imagebg">
          <div className="topnav">
            <Link to="/">Home</Link>
            <Link to="#news">About</Link>
            <Link to="#contact">Archive</Link>
            <Link to="/login">T&P Portal</Link>
            <Link to="/">Our Team</Link>
            <Link to="/">Contact us</Link>
          </div>
        </div>
      </div>
      <div className="centered">
        <h1>JIIT Placment Portal</h1>
      </div> */}
    </div>
  );
}
