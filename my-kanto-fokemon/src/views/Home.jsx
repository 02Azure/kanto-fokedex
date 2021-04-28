import React from 'react'
import FokemonTile from '../components/fokemon-tile.jsx'
import useFetchFokemon from '../hooks/useFetchFokemon.jsx'
import titleImg from '../assets/title.png'
import loadingImg from '../assets/loading-pokeball.gif'
import { Link } from "react-router-dom"

function Home(props) {
  const { fokemons, loadingFokemons } = useFetchFokemon()

  let fokemonTiles = fokemons.map(fokemon => {
    return (
      <FokemonTile 
        { ...fokemon }
        key = { fokemon.id }
        addToFavorites = { props.addToFavorites } 
      />
    )
  })

  return(
    <div id="home-page" className="page">
      <img 
        id = "title-img" 
        src = { titleImg }  
        alt = "fokedex"
      />
      <Link to="/favorites">My Favorites</Link>
      <h3>All Fokemon</h3>
      { loadingFokemons ? 
        <>
          <img 
            className = "loading-image"
            src = { loadingImg } 
            alt = "loading-pokeball.gif"
          /> 
          <h2 className="loading-text"> Loading fokemon list...</h2>
        </>
        :

        <div className="fokemon-container">
          { fokemonTiles }
        </div>
      }
    </div>
  )
}
export default Home