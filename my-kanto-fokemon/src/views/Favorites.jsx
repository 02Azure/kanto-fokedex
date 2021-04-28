import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import FokemonTile from '../components/fokemonTile.jsx'

function Favorites() {
  const favorites = useSelector(state => state.favorites)

  let favoriteTiles = favorites.map(fokemon => {
    return (
      <FokemonTile 
        { ...fokemon }
        key = { fokemon.id }
        action = "delete"
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