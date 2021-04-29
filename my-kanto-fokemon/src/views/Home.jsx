import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchFokemons } from "../store/actions.js"
import FokemonTile from '../components/fokemonTile.jsx'
import LoadingFokeball from '../components/loadingFokeball.jsx'
import titleImg from '../assets/title.png'

function Home() {
  const dispatch = useDispatch()
  const history = useHistory()

  const fokemons = useSelector(state => state.fokemons)
  const error = useSelector(state => state.error)

  const [loadingFokemons, setLoadingFokemons] = useState(true)
  const [filterKeyword, setFilterKeyword] = useState("")
  const [filteredFokemons, setFilteredFokemons] = useState([])
  const [timeoutId, setTimeoutId] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    dispatch(fetchFokemons())
  }, []) 

  useEffect(() => { //handle local state setelah data fokemons berhasil di fetch
    if(fokemons.length) {
      setFilteredFokemons(fokemons)

      setTimeout(() => {
        setLoadingFokemons(false)
      }, 1200)

    } else if(error.code) { //jika fokemons tidak ada isinya ( alias error di fetch )
      if(error.code === 404) { //sementara hanya handle 404 not found
        history.push("/notfound")
      }
    }
  }, [fokemons, error])

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