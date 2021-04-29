import { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchFokemonDetail } from "../store/actions.js"
import LoadingFokeball from "../components/loadingFokeball.jsx"

function FokemonDetail() {
  const dispatch = useDispatch()
  const fokemon = useSelector(state => state.fokemon)
  const error = useSelector(state => state.error)
  const [loading, setLoading] = useState(true)
  let history = useHistory()
  let { id } = useParams()
  
  useEffect(() => {
    dispatch(fetchFokemonDetail(id))
  }, [id])

  useEffect(() => {
    if(fokemon.id) { //kondisional agar saat mounted tidak langsung ganti setloading ke false
      setTimeout(() => {
        setLoading(false)
      }, 1000)

    } else if(error.code) { //jika fokemon.id tidak ada ( alias error di fetch )
      if(error.code === 404) {
        history.push("/notfound")
      }
    }
  }, [fokemon, error])

  return(
    <div id="fokemon-detail-page" className="page">
      { loading ? 
        <div className="loading-container">
          <LoadingFokeball msg="Loading Fokemon data..." /> 
        </div> 
      :
        <>
          <h2>{ "#" + fokemon.id + " " + fokemon.name }</h2>
          <hr/>
          
          <div id="fokemon-detail">
            <div id="fokebody-info">
              <h3 id="fokemon-form">{ fokemon.form } Fokemon</h3>
              <p id="fokemon-flavor-text">{ fokemon.flavor_text }</p>
              <p id="fokemon-height">Height: { fokemon.height} m</p>
              <p id="fokemon-weight">Weight: { fokemon.weight} kg</p>
              <p id="fokemon-types">Type: { fokemon.types }</p>
            </div>
            <div id="fokemon-main-image-container">
              <img 
                id = "fokemon-main-image" 
                src = { `https://pokeres.bastionbot.org/images/pokemon/${fokemon.id}.png`} 
                alt = { fokemon.name + "_image" }
              />
            </div>
          </div>
    
          <Link className="return-link" to="/">Return</Link>
        </>
      }
    </div>
  )
}

export default FokemonDetail