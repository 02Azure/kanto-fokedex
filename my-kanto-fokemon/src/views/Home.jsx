import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setFokemons } from "../store/actions.js"
import FokemonTile from '../components/fokemonTile.jsx'
import LoadingFokeball from '../components/loadingFokeball.jsx'
import titleImg from '../assets/title.png'

function Home() {
  const fokemons = useSelector(state => state.fokemons)
  const dispatch = useDispatch()
  const [loadingFokemons, setLoadingFokemons] = useState(true)
  const [filterKeyword, setFilterKeyword] = useState("")
  const [filteredFokemons, setFilteredFokemons] = useState([])
  const [timeoutId, setTimeoutId] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        data.results.forEach((fokemon, i) => {
          fokemon.id = i + 1
          fokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
        })
        dispatch(setFokemons(data.results))
        setFilteredFokemons(data.results)
        //tes
        setTimeout(() => {
          setLoadingFokemons(false)
        }, 1200)

      })
      .catch(err => {
        console.log(err)
      })
  }, []) 

  useEffect(() => {
    if(isSearching) {
      setTimeoutId(setTimeout (() => {
        let filtered = fokemons.filter(fokemon => fokemon.name.includes(filterKeyword))
        setFilteredFokemons(filtered)
      }, 2000))
    }
  }, [filterKeyword])

  function handleFilterKeyword(event) {
    clearTimeout(timeoutId)
    setIsSearching(true)
    setFilterKeyword(event.target.value)
  }

  let fokemonTiles = filteredFokemons.map(fokemon => {
    return (
      <FokemonTile 
        { ...fokemon }
        key = { fokemon.id }
        action = "add" 
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
        <>
        <div id="search-box">
          <input 
            id = "foke-search" 
            type = "text" 
            placeholder = "Search by name"
            value = { filterKeyword }
            onChange = { handleFilterKeyword }
          /> 
        </div>
        <br/><br/>
        { fokemonTiles.length ? 
          <div className="fokemon-container">
            { fokemonTiles }
          </div>
        : 
          <div>No fokemon is found with that keyword...</div> 
        }
        </>
      }
    </div>
  )
}
export default Home