import React from 'react'
import './Team.css'
import Navbar from './Navbar'
import Footer from './footer'
export default function Team() {
  return (
    <div>
        <Navbar/>
        <div className="responsive-container-block outer-container">
  <div className="responsive-container-block inner-container">
    <p className="text-blk heading-text">
      <h1><u> Our Team</u></h1>
    </p>
    <div className="responsive-container-block cards-container">
      <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
        <div className='dist'>
        <p className="text-blk name">
          Hrithik Gopal Bhagat
        </p>
        <p className="text-blk position">
          CSE
        </p>
        </div>
        <img id="one" className="team-member-image" src={require("./hrithik.jpeg")}/>
        <div>
        <a href="https://www.facebook.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg"/>
        </a>
        <a href="https://www.gmail.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg"/>
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"/>
        </a>
        </div>
      </div>
      <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
        <p className="text-blk name">
          Dhruv Gupta
        </p>
        <p className="text-blk position">
          CSE
        </p>
        <img className="team-member-image" src={require("./dhruv.jpeg")}/>
        <div>
        <a href="https://www.facebook.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg"/>
        </a>
        <a href="https://www.gmail.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg"/>
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"/>
        </a>
        </div>
      </div>
      <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
        <p className="text-blk name">
          Kushagra Bansal
        </p>
        <p className="text-blk position">
          CSE
        </p>
        <img className="team-member-image" src={require("./kushagra.jpeg")}/>
        <div>
        <a href="https://www.facebook.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg"/>
        </a>
        <a href="https://www.gmail.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg"/>
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <img className="social-media-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"/>
        </a>
        </div>
      </div>
    </div>
  </div>
</div>
<footer><Footer /></footer>

   </div>
  )
}
