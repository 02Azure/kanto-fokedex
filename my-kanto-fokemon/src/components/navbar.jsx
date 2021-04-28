import React from 'react'
import navbarImg from "../assets/navbarTitle.png"
import { Link } from "react-router-dom"

function Navbar() {
  return(
    <header>
      <nav>
        <img id="navbar-img" src={ navbarImg } alt="navbar-title_image"/>

        <div id="navbar-link-container">
          <Link to="/favorites">My Favorites</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar