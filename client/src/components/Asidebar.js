import React from 'react'
import { Link } from 'react-router-dom'
export default function Asidebar() {
  return (
    <div>
      <div className="sidebar">
        <Link className="active" to="#home">Home</Link>
        <Link to="#news">News</Link>
        <Link to="#contact">Contact</Link>
        <Link to="#about">About</Link>
      </div>
    </div>
  )
}
