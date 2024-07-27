import "./login.css"
import React, { useRef } from 'react'
import Anavbar from './Anavbar'
import Asidebar from "./Asidebar"
import './Addstudent.css';

export default function Addstudent() {
  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const studentData = {
      fullName: formData.get('sname'),
      email: formData.get('email'),
      enrollmentNumber: formData.get('enrol'),
      password: formData.get('password'),
      cgpa: formData.get('cgpa'),
      branch: formData.get('branch'),
      graduationYear: formData.get('gradyear'),
    };

    console.log(studentData);

    try {
      const response = await fetch('http://localhost:8000/api/students/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        // console.log(response.statusText);
        // console.log(response.error);
        throw new Error('Failed to add student - Bad response');
      }

      alert('Student added successfully');
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to add student');
    }
  };

  return (
    <div className="addstud">
      <Anavbar />
      <div className="container-fluid" >
        <div className="row justify-content-center ">
          <div className="col-12 col-md-8 glass-container">
            <div className='mt-1 nav d-flex justify-content-center  '>
              <h2>ENTER STUDENT DETAILS BELOW:</h2>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="admin_form ">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <label htmlFor="sname" className="form-label">Student Name</label>
                    <input name="sname" type="text" className="form-control" id="name1" />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='enrol' className='form-label'>Enrollment Number:</label>
                    <input name="enrol" type='number' className='form-control' />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='email' className='form-label'>Email:</label>
                    <input name="email" type='email' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-2'>
                    <label htmlFor='branch' className='form-label'>Branch:</label>
                    <input name="branch" type='text' className='form-control' />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='gradyear' className='form-label'>Graduation Year:</label>
                    <input name="gradyear" type='number' className='form-control' />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='cgpa' className='form-label'>CGPA:</label>
                    <input name="cgpa" type='number' className='form-control' />
                  </div>
                  
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark btn-lg mt-2">Add Student</button>
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
  //     <div className='mt-3 nav'>
  //       <h2><u>Enter student details below:</u></h2>
  //     </div>
  //     <form ref={formRef} onSubmit={handleSubmit} className="admin_form">
  //       <div className="mb-3">
  //         <label htmlFor="sname" className="form-label">Student Name</label>
  //         <input name="sname" type="text" className="form-control" id="name1" />
  //       </div>
  //       <div className='mb-3'>
  //         <label htmlFor='enrol' className='form-label'>Enrollment Number:</label>
  //         <input name="enrol" type='number' className='form-control' />
  //       </div>
  //       <div className='mb-3'>
  //         <label htmlFor='email' className='form-label'>Email:</label>
  //         <input name="email" type='email' className='form-control' />
  //       </div>
  //       <div className='mb-3'>
  //         <label htmlFor='branch' className='form-label'>Branch:</label>
  //         <input name="branch" type='text' className='form-control' />
  //       </div>
  //       <div className='mb-3'>
  //         <label htmlFor='gradyear' className='form-label'>Graduation Year:</label>
  //         <input name="gradyear" type='number' className='form-control' />
  //       </div>
  //       <div className='mb-3'>
  //         <label htmlFor='cgpa' className='form-label'>CGPA:</label>
  //         <input name="cgpa" type='number' className='form-control' />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="password" className="form-label">Password</label>
  //         <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
  //       </div>

  //       <div>
  //         <button type="submit" className="btn btn-dark">Add Student</button>
  //       </div>
  //     </form>
  //   </div>
  // )
}
