import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Snavbar from './Snavbar';

export default function Applicationinfo() {
  const { companyId } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        console.log(companyId);
        const response = await fetch(
          `http://localhost:8000/api/students/job/${companyId}`,
          {
            method: "GET",
            credentials: "include",

          }
        );
        console.log(companyId);
        const json = await response.json();
        if (json.success) {
          setCompany(json.data);
        } else {
          console.log("fetching unsuccessful");
        }
      } catch (error) {
        console.log("error fetching company", error);
      }
    };
    fetchCompany();
  }, [companyId]);

  const formatRegister = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div>
      <Snavbar />
      <div className="container-fluid hello">
        <h1 className="text-center">
          <b>
            Company Details
          </b>
        </h1>

        {Object.keys(company).length > 0 ? (
          <div className="mt-5">
            <span className="cname">Company name: {company.companyName}</span>
            <hr />
            <span className="display-8">Batch: {company.batch}</span>
            <hr />
            <span className="display-8">CGPA: {company.cgpa} </span>
            <hr />
            <span className="display-8">Branch: {company.branches}</span>
            <hr />
            <span className="display-8">
              Place of posting: {company.location}
            </span>
            <hr />
            <span className="display-8">Role: {company.role}</span>
            <hr />
            <span className="display-8">Stipend: {company.salary}</span>
            <hr />
            <span className="display-8">Category: {company.type}</span>
            <hr />
            <span className="display-8">
              Registration last date: {formatRegister(company.registerBy)}
            </span>
            <hr />
            <span className="display-8">
              Test date: {formatRegister(company.testDate)}
            </span>
            <hr />
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  )
}
