import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import "./Companyitem.css";
import { FaTrash } from "react-icons/fa";

export default function Companyitem(props) {
  const deleteArticle = async () => {
    const response = await fetch(
      `http://localhost:8000/api/admin/job/${props.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete job");
    }
    props.onArticleDeleted(props.id);
  };

  const generateReport = async () => {
    const response = await fetch(
      `http://localhost:8000/api/admin/job/report/${props.id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to generate report");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_${props.id}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    // <div className="company_card">
    //   <div className="card p-3 mb-2">
    //     <div className="d-flex justify-content-between">
    //       <div className="d-flex flex-row align-items-center">
    //         <img className="icon" src={props.logoUrl} alt="Cloudinary" />

    //         <div className="ms-2 c-details">
    //           <h5 className="mb-0">{props.cname}</h5>
    //         </div>
    //       </div>
    //       <div className="badge">
    //         <span>{props.role}</span>
    //       </div>
    //     </div>
    //     <div className="mt-4 mb-4">
    //       <div className="d-flex align-items-center">
    //         <div className="icon2">
    //           {" "}
    //           <i className="bx bxl-mailchimp"></i>{" "}
    //         </div>

    //         <span className="text-muted d-block fs-5">
    //           <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
    //           {props.post}
    //         </span>
    //       </div>

    //       <div className="d-flex align-items-center">
    //         <div className="icon3">
    //           {" "}
    //           <i className="bx bxl-mailchimp"></i>{" "}
    //         </div>

    //         <span className="text-muted d-block fs-5">
    //           <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
    //           {props.ctc}
    //         </span>
    //       </div>
    //     </div>
    //     <div className="flex">
    //       <Link
    //         to={`/company/${props.id}`}
    //         className="btn btn-primary button-33"
    //       >
    //         view
    //       </Link>
    //     </div>
    //     <button onClick={deleteArticle} className="iconbutton">
    //       <FaTrash id="bin" />
    //     </button>
    //     <button
    //       className="btn btn-dark"
    //       onClick={generateReport}
    //       id="genbutton"
    //     >
    //       Generate Report
    //     </button>
    //   </div>
    // </div>
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
              <i className="bx bxl-mailchimp"></i>
            </div>
            <span className="text-muted d-block fs-5">
              {/* <i className="fa fa-map-marker" aria-hidden="true"></i>{" "} */}
              <i aria-hidden="true"></i>{" "}
              {props.post}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <div className="icon3">
              <i className="bx bxl-mailchimp"></i>
            </div>
            <span className="text-muted d-block fs-5">
              {/* <i className="fa fa-map-marker" aria-hidden="true"></i>{" "} */}
              <i aria-hidden="true"></i>{" "}
              {props.ctc}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center">
          <Link to={`/company/${props.id}`} className="btn btn-primary">
            View
          </Link>
          <button
            className="btn application btn-primary me-2"
            onClick={generateReport}
            id="genbutton"
          >
            Application
          </button>
          <button onClick={deleteArticle} className="btn btn-danger">
            <FaTrash id="bin" />
          </button>
        </div>
      </div>
    </div>
  );
}
