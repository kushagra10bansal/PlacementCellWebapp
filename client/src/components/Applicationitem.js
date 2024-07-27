import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Snavbar from './Snavbar';

export default function Applicationitem(props) {
    // const { companyId } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/students/job/${props.job}`,
          {
            method: "GET",
            credentials: "include",
            header: {
              "Content-Type": "application/json",
            },
          }
        );
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
  }, [props.job]);

  return (
    <div>
        <Snavbar/>
        {/* {Object.keys(company).length > 0 ? ( */}
      <div className="card mt-5 application-card">
  {/* <h5 className="card-header">{company.companyName}</h5> */}
  <div className="card-body ">
    <h5 className="card-title">{company.companyName}</h5>
    <p className="card-text">{props.status}</p>
    <Link to={`/applications/${props.job}`} className="btn btn-primary">View More</Link>
  </div>
</div>
        {/* ):(<p>loading...</p> */}
  {/* )}; */}
    </div>
  )
}
