import React from 'react'
import surprised_pikachu from '../assets/surprised-pikachu.gif'

function NotFound() {
  return(
    <div id="not-found-page" className="page">
      <h2>Error 404 Not Found</h2>
      <img src={ surprised_pikachu } alt="Surprised pikachu gif"/>
      <p>The page you are navigated into is not found</p>
    </div>
  )
}

export default NotFound