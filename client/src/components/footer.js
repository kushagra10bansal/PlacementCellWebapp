import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-dark text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom mt-5">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <div>
            <Link to="https://www.facebook.com/" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="https://twitter.com/" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="https://www.google.com/" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="https://www.instagram.com/" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="https://www.linkedin.com/" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link to="https://github.com/" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <h3>JIIT T&P</h3>
            </h6>
            <p>
              Unlock your potential: navigate your career with JIIT PLACEMENT PORTAL
              – Where Placement is Made Simple!
            </p>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Products</h6>
            <p>
              <Link to="/login" className="text-reset">
                Admin Portal
              </Link>
            </p>
            <p>
              <Link to="/slogin" className="text-reset">
                Student Portal
              </Link>
            </p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
            <p>
              <Link to="/" className="text-reset">
                Home
              </Link>
            </p>
            <p>
              <Link to="/About" className="text-reset">
                About
              </Link>
            </p>
            <p>
              <Link to="/team" className="text-reset">
                Our Team
              </Link>
            </p>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i className="fas fa-home me-3"></i> A 10, A Block, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309            </p>
            <p>
              <i className="fas fa-envelope me-3"></i>
              pcellapp@gmail.com
            </p>
            <p>
              <i className="fas fa-phone me-3"></i> + 91 9091843838
            </p>

          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:

      </div>
    </footer>
  );
}

export default Footer;
