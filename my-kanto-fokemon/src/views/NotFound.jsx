import React from 'react'
import surprised_pikachu from '../assets/surprisedPikachu.gif'
import { Link } from "react-router-dom"

function NotFound() {
  return(
    <div id="not-found-page" className="page">
      <h2>Error 404 Not Found</h2>
      <img src={ surprised_pikachu } alt="Surprised pikachu gif"/>
      <p>The page you are navigated into is not found</p>
      <Link to="/"><button>I'm scared, return me to home!</button></Link>
    </div>
  )
}

export default NotFound