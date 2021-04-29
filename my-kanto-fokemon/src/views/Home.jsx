import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchFokemons, setFokemons, setError } from "../store/actions.js"
import FokemonTile from '../components/fokemonTile.jsx'
import LoadingFokeball from '../components/loadingFokeball.jsx'
import titleImg from '../assets/title.png'

function Home() {
  const dispatch = useDispatch()
  const history = useHistory()

  const fokemons = useSelector(state => state.fokemons)
  const error = useSelector(state => state.error)

  const [loading, setLoading] = useState(true)
  const [filterKeyword, setFilterKeyword] = useState("")
  const [filteredFokemons, setFilteredFokemons] = useState([])
  const [timeoutId, setTimeoutId] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    dispatch(fetchFokemons())
      .then(response => { 
        if(!response.ok) {
          let error = new Error(response.statusText)
          error.code = response.status
          throw error
        } 
        return response.json()
      })

      .then(data => {
        data.results.forEach((fokemon, i) => {
          fokemon.id = i + 1
          fokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
        })

        dispatch(setFokemons(data.results))
        setFilteredFokemons(data.results)

        setTimeout(() => {
          setLoading(false)
        }, 1200)
      })

      .catch(err => {
        dispatch(setError(err))
      })
  }, []) 

  useEffect(() => {
    if(error.code) {
      if(error.code === 404) { //sementara hanya handle 404 not found
        history.push("/notfound")
      }
    }
  }, [error])

  useEffect(() => { //debouncing
    if(isSearching) {
      setTimeoutId(setTimeout(() => {
        let filtered = fokemons.filter(fokemon => fokemon.name.includes(filterKeyword))
        setFilteredFokemons(filtered)
      }, 2000))
    }
  }, [fokemons, isSearching, filterKeyword])

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
      <br/>
      { loading ? 
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