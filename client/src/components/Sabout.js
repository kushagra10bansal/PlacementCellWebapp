import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import Snavbar from './Snavbar'
export default function Sabout() {
  return (
    <div>
        <Snavbar/>
       <div className='abus'>
            <h1><u>About Us</u></h1>
        </div>
      <div className="responsive-container-block bigContainer">
  <div className="responsive-container-block Container">
    <img className="mainImg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/eaboutus1.svg"/>
    <div className="allText aboveText">
      <p className="text-blk headingText">
        JIIT T&P
      </p>
      
      <p className="text-blk description">
      This placement portal is an online platform designed to connect JIIT students with potential employers. It serves as a centralized hub where companies can post job vacancies, internship opportunities, and other career-related information. Students just need to upload resumes, and search for relevant job listings based on their skills, experience, and preferences. This portal often include features like job alerts, and networking opportunities to enhance the job search experience for both candidates and employers.      </p>
    </div>
  </div>
  <div className="responsive-container-block Container bottomContainer">
    <img className="mainImg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/xpraup2.svg"/>
    <div className="allText bottomText">
      <p className="text-blk headingText">
        Our Vision
      </p>
     
      <p className="text-blk description">
      The vision of this placement portal is to revolutionize the job market for JIIT students by creating a seamless and efficient ecosystem where talent meets opportunity. It aims to empower students by providing them with access to a diverse range of job opportunities, career guidance, etc. Simultaneously, the portal strives to support employers in finding the right candidates for their roles through streamlined recruitment processes. Ultimately, the vision is to bridge the gap between talent and organizations, fostering mutual growth and success in the professional landscape.      </p>
    </div>
  </div>
</div>
    </div>
  )
}
