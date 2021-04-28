import React from 'react'
import FokemonTile from '../components/fokemonTile.jsx'
import LoadingFokeball from '../components/loadingFokeball.jsx'
import useFetchFokemon from '../hooks/useFetchFokemon.jsx'
import titleImg from '../assets/title.png'

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
      <h3>All Fokemon</h3>
      { loadingFokemons ? 
      <LoadingFokeball msg="Loading fokemon list..." />
        :
        <div className="fokemon-container">
          { fokemonTiles }
        </div>
      }
    </div>
  )
}
export default Home