import React, { useRef } from "react";
import "./login.css";
import Anavbar from "./Anavbar";
import "./Addcompany.css";

export default function Addcompany() {
  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("http://localhost:8000/api/admin/job", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        // console.log(response.statusText);
        // console.log(response.error);
        throw new Error("Failed to add company");
      }

      alert("Company added successfully");
      formRef.current.reset();
    } catch (error) {
      // console.error(error);
      alert("Failed to add company");
    }
  };

  return (
    <div className="addcomp">
      <Anavbar />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 glass-container">
            <div className="mt-1 nav d-flex justify-content-center">
              <h2>ENTER COMPANY DETAILS BELOW:</h2>
            </div>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <label htmlFor="companyName" className="form-label">
                      Company Name:
                    </label>
                    <input
                      name="companyName"
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="location" className="form-label">
                      Place of posting:
                    </label>
                    <input
                      name="location"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="batch" className="form-label">
                      Batch:
                    </label>
                    <input
                      name="batch"
                      type="number"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="salary" className="form-label">
                      CTC/Stipend:
                    </label>
                    <input
                      name="salary"
                      type="number"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="role" className="form-label">
                      Role:
                    </label>
                    <input name="role" type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-2">
                    <label htmlFor="cgpa" className="form-label">
                      CGPA:
                    </label>
                    <input name="cgpa" type="number" className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="type" className="form-label">
                      Category:
                    </label>
                    <input
                      name="type"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="branches" className="form-label">
                      Allowed Branches:
                    </label>
                    <input
                      name="branches"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="registerBy" className="form-label">
                      Registration Last Date:
                    </label>
                    <input
                      name="registerBy"
                      type="date"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="testDate" className="form-label">
                      Test Date:
                    </label>
                    <input
                      name="testDate"
                      type="date"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="logo" className="form-label">
                      Company Logo:
                    </label>
                    <input
                      name="logo"
                      type="file"
                      id="logo"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-dark btn-lg mt-2">
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <Anavbar />
  //     <div>
  //       <h2 className='mt-5'>
  //         <u>Enter Company Details below: </u>
  //       </h2>
  //     </div>
  //     <form ref={formRef} onSubmit={handleSubmit}>
  //       <div className="mb-3 mt-3">
  //         <label htmlFor="companyname" className="form-label">Company Name:</label>
  //         <input name="companyname" type="text" className="form-control" aria-describedby="emailHelp" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="postingplace" className="form-label">Place of posting:</label>
  //         <input name='postingplace' type="text" className="form-control" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="batch" className="form-label">Batch:</label>
  //         <input name='batch' type="number" className="form-control" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="stipend" className="form-label">CTC/Stipend:</label>
  //         <input name='stipend' type="number" className="form-control" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="cgpa" className="form-label">CGPA:</label>
  //         <input name='cgpa' type="number" className="form-control" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="category" className="form-label">Category:</label>
  //         <input name='category' type="text" className="form-control" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="role" className="form-label">Role:</label>
  //         <input name='role' type="text" className="form-control" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="allowed" className="form-label">Allowed Branches:</label>
  //         <input name='allowed' type="text" className="form-control" />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="lastdate" className="form-label">Registration Last Date:</label>
  //         <input name='lastdate' type="date" className="form-control" />
  //       </div>
  //       <br /><br />
  //       <button type="submit" className="btn btn-dark">Add Company</button>
  //     </form>
  //   </div>
  // )
}
