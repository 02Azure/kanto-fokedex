import {useState, useEffect} from 'react'

function useFetchFokemon() {
  const [fokemons, setFokemons] = useState([])

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

  return fokemons
}

export default useFetchFokemon