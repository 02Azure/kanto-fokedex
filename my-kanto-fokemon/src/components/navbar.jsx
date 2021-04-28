import React from 'react'
import navbarImg from "../assets/navbarTitle.png"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

function Navbar() {
  let history = useHistory()

  function toHome() {
    history.push("/")
  }

  return(
    <header>
      <nav>
        <img onClick={ toHome } id="navbar-img" src={ navbarImg } alt="navbar-title_image"/>

        <div id="navbar-link-container">
          <Link className="nav-link" to="/favorites"><i className="fa fa-star"></i>  My Favorites</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar