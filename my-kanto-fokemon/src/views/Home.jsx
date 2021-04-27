import React from 'react'
import FokemonTile from '../components/fokemon-tile.jsx'
import useFetchFokemon from '../hooks/useFetchFokemon.jsx'
import useFavFokemons from '../hooks/useFavFokemons.jsx'
import titleImg from '../assets/title.png'
import loadingImg from '../assets/loading-pokeball.gif'

function Home() {
  const { fokemons, loadingFokemons } = useFetchFokemon()
  const { favorites, addToFavorites, removeFromFavorites } = useFavFokemons()

  let fokemonTiles = fokemons.map(fokemon => {
    return (
      <FokemonTile 
        { ...fokemon }
        key = { fokemon.id }
        addToFavorites = { addToFavorites } 
      />
    )
  })

  let favoriteTiles = favorites.map(fokemon => {
    return (
      <FokemonTile 
        { ...fokemon }
        key = { fokemon.id }
        removeFromFavorites = { removeFromFavorites } 
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
      
      <h3>My Favorites</h3>
      <div className="fokemon-container">
        { favoriteTiles }
      </div>

      <h3>All Fokemon ( Click to add to your favorites! )</h3>
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