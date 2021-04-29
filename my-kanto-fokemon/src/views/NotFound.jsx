import React, { useEffect } from 'react'
import surprised_pikachu from '../assets/surprisedPikachu.gif'
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setError } from "../store/actions.js"

function NotFound() {
  const dispatch = useDispatch() 

  useEffect(()=>{
    return dispatch(setError({})) //reset error ke kosong saat meninggalkan page ini
  }, [])

  return(
    <div id="not-found-page" className="page">
      <h2>Error 404 Not Found</h2>
      <img src={ surprised_pikachu } alt="Surprised pikachu gif"/>
      <p>The page you are navigated into is not found</p>
      <Link to="/"><button>I'm scared, return me to home!</button></Link>
    </div>
  )
}

export default NotFound