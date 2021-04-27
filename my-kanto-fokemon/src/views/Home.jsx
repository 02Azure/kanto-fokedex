import React, {useState, useEffect} from 'react'
import FokemonTile from '../components/fokemon-tile.jsx'

function Home() {
  const [fokemons, setFokemons] = useState([])
  const [favorites, setFavorites] = useState([])

  const addToFavorites = (fokemon) => () => {
    if(!favorites.find(favFokemon => favFokemon.id === fokemon.id)) setFavorites([...favorites, fokemon])
  }

  const removeFromFavorites = (fokemon) => () => {
    let removedIndex = favorites.findIndex(favFokemon => favFokemon.id === fokemon.id)
    let newFavorite = [...favorites]
    newFavorite.splice(removedIndex, 1)

    setFavorites(newFavorite)
  }

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        data.results.forEach((fokemon, i) => {
          fokemon.id = i + 1
          fokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
        })
        setFokemons(data.results)
      })
  }, []) 

  let fokemonTiles = fokemons.map(fokemon => {
    return (
      <FokemonTile 
        id = { fokemon.id } 
        name = { fokemon.name }
        sprite = { fokemon.sprite }
        key = { fokemon.id }
        addToFavorites = { addToFavorites } 
      />
    )
  })

  let favoriteTiles = favorites.map(fokemon => {
    return (
      <FokemonTile 
        id = { fokemon.id } 
        name = { fokemon.name }
        sprite = { fokemon.sprite }
        key = { fokemon.id }
        removeFromFavorites = { removeFromFavorites } 
      />
    )
  })

  return(
    <div id="home-page" className="page">
      <h2>Kanto Fokemon List</h2>
      
      <h3>My Favorites</h3>
      <div className="fokemon-container">
        { favoriteTiles }
      </div>

      <h3>All Pokemon ( Click to add to your favorites! )</h3>
      <div className="fokemon-container">
        { fokemonTiles }
      </div>
    </div>
  )
}
export default Home