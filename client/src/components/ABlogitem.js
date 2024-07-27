import React from 'react'
import { Link } from 'react-router-dom'
import "./login.css"
import Anavbar from './Anavbar';

export default function ABlogitem(props) {

  const shortDescription = props.description.substring(0, 75) + "...";
  
  return (
    <div>
      <Anavbar/>
    <div className='company_card'>
      <div className="card">
        <div className="card-header">
          {props.batch}
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.cname}</h5>
          <p className="card-text">{props.type}</p>
          <p className="card-text">{shortDescription}</p>

          <Link to={`/ablog/${props.id}`} className="btn btn-primary">View Blog</Link>

        </div>
      </div>
    </div>
    </div>
  )
}

