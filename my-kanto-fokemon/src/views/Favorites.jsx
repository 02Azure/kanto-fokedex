import React from 'react'
import FokemonTile from '../components/fokemonTile.jsx'
import { Link } from "react-router-dom"

function Favorites(props) {
  let favoriteTiles = props.favorites.map(fokemon => {
    return (
      <FokemonTile 
        { ...fokemon }
        key = { fokemon.id }
        removeFromFavorites = { props.removeFromFavorites } 
      />
    )
  })

  return(
    <div id="favorite-page" className="page">
      <h3>My Favorites</h3>
      <Link to="/">Return to Home</Link>
      <hr/>
      <div className="fokemon-container">
        { favoriteTiles }
      </div>
    </div>
  )
}

export default Favorites