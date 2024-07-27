import React, { useRef } from 'react'
import './Addblog.css';
import Anavbar from './Anavbar';
export default function Addblog() {
  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(Array.from(formData));
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      // eslint-disable-next-line prefer-destructuring
      data[key] = value;
    }

    try {
      const response = await fetch("http://localhost:8000/api/blogs", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        // console.log(response.statusText);
        // console.log(response.error);
        throw new Error("Failed to add blog");
      }

      alert("Blog added successfully");
      formRef.current.reset();

    } catch (error) {
      console.error(error);
      alert("Failed to add Blog");
    }
  };
  return (
    <div className='addblog'>
      <Anavbar />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 glass-container">
            <div className="mt-1 nav d-flex justify-content-center">
              <h2>ENTER BLOG</h2>
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
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="type" className="form-label">
                      Type:
                    </label>
                    <input
                      name="type"
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
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="description" className="form-label">
                      Enter Blog:
                    </label>
                    <textarea
                      name="description"
                      type="text"
                      className="form-control"
                      id="desc"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark btn-lg mt-2">
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
