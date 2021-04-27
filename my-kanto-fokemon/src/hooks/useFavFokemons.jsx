import { useState } from 'react'

function useFavFokemons() {
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

  return { favorites, addToFavorites, removeFromFavorites }
}

export default useFavFokemons