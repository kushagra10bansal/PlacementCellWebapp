import React, { useEffect, useState } from 'react'
import Anavbar from './Anavbar'
import Companyitem from './Companyitem'
import './login.css'
export default function Ahome() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/admin/job', {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        });
        const json = await response.json();

        if (json.success) {
          // console.log(json);
          setArticles(json.data);
        }
        else {
          console.log("Json response unsuccessful");
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleArticleDeleted = (id) => {
    // Update the articles state after deletion
    setArticles(articles.filter(article => article._id !== id));
  };

  return (
    <div className='main123'>
      <Anavbar />
      <div className='mt-4'>
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div key={element._id} className="col-md-4">
                <Companyitem onArticleDeleted={handleArticleDeleted} logoUrl={element.logo} cname={element.companyName} post={element.location} ctc={element.salary} id={element._id}  role={element.role} />
              </div>
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
