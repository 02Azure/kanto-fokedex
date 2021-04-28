import React, { useState, useEffect } from 'react'
import FokemonTile from '../components/fokemonTile.jsx'
import LoadingFokeball from '../components/loadingFokeball.jsx'
import titleImg from '../assets/title.png'
import { useSelector, useDispatch } from "react-redux"

function Home(props) {
  const fokemons = useSelector(state => state.fokemons)
  const dispatch = useDispatch()
  const [loadingFokemons, setLoadingFokemons] = useState(true)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        data.results.forEach((fokemon, i) => {
          fokemon.id = i + 1
          fokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
        })
        dispatch({ type: "fokemons/getAll", payload: data.results })
        //tes
        setTimeout(() => {
          setLoadingFokemons(false)
        }, 1200)

      })
      .catch(err => {
        console.log(err)
      })
  }, []) 

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