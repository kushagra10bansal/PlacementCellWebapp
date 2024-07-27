import React,{useState,useEffect} from 'react'
import Snavbar from './Snavbar';
import Applicationitem from './Applicationitem';
import {Link} from 'react-router-dom';
import './Applicationstatus.css';
export default function Applicationstatus() {
    const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/students/applications', {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        });
        const json = await response.json();
        
        if (json.success){
          console.log(json);
          setArticles(json.data);
        }
        else{
          console.log("Json response unsuccessful");
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);
  
  return (
    <div className='appmain'>
       <Snavbar/>
      <div className='mt-4'>
      <div className="container">
        <div className="row">
            { articles.map((element)=>{
                return <div key={element._id} className="col-md-4">
                     <Applicationitem job={element.job} student={element.student} status={element.status} resume={element.resume}/>
                </div>
            })}
             </div>
             </div>
    
             </div>
    </div>
  )
}
