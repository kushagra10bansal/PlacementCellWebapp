import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./login.css"
import Companyinfo from './Companyinfo'
import Snavbar from './Snavbar';
import "./Applyitem.css"
export default function Applyitem(props) {
  const { articles } = props;
  return (
    <div>
      <Snavbar />
      {/* <div className='company_card'>
      <div className="card">
        <div className="card-header">
          {props.post}
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.cname}</h5>
          <p className="card-text">{props.ctc}</p>
          <Link to={`/apply/${props.id}`} className="btn btn-primary">view opportunity</Link>

        </div>
      </div>
    </div> */}


      <div className="company_card">
        <div className="card p-3 mb-2">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <img className="icon" src={props.logoUrl} alt="Cloudinary" />
              <div className="ms-2 c-details">
                <h5 className="mb-0">{props.cname}</h5>
              </div>
            </div>
            <div className="badge">
              <span>{props.role}</span>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div className="d-flex align-items-center">
              <div className="icon2">
                {" "}
                <i className="bx bxl-mailchimp"></i>{" "}
              </div>

              <span className="text-muted d-block fs-5">
                <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                {props.post}
              </span>
            </div>

            <div className="d-flex align-items-center">
              <div className="icon3">
                {" "}
                <i className="bx bxl-mailchimp"></i>{" "}
              </div>

              <span className="text-muted d-block fs-5">
                <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                {props.ctc}
              </span>
            </div>
          </div>
          <div className="flex">
            <Link
              to={`/apply/${props.id}`}
              className="btn btn-primary button-33"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

