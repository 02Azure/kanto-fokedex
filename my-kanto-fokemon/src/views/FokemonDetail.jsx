import { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setFokemon } from "../store/actions.js"
import LoadingFokeball from "../components/loadingFokeball.jsx"

function FokemonDetail() {
  const dispatch = useDispatch()
  const fokemon = useSelector(state => state.fokemon)
  const [loading, setLoading] = useState(true)
  let history = useHistory()
  let { id } = useParams()
  
  useEffect(() => {
    let mainDetail = {}

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(resMain => {
        if(!resMain.ok) throw { status: resMain.status, msg: resMain.statusText } 
        return resMain.json()
      })

      .then(mainData => {
        mainDetail = mainData
        return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      })

      .then(resSecondary => {
        if(!resSecondary.ok) throw { status: resSecondary.status, msg: resSecondary.statusText } 
        return resSecondary.json()
      })

      .then(secondaryDetail => {
        let { id, name, height, weight, types } = mainDetail
        name = name[0].toUpperCase() + name.slice(1)
        height /= 10
        weight /= 10
        types = types.map(typeNum => typeNum.type.name[0].toUpperCase() + typeNum.type.name.slice(1)).join("/")

        let flavor_text = secondaryDetail.flavor_text_entries[0].flavor_text
        flavor_text = flavor_text.split(".").join(". ")

        let form = secondaryDetail.egg_groups[0].name
        form = form[0].toUpperCase() + form.slice(1)

        let fokemonData = {
          id, name, form, height, weight, types, flavor_text
        }

        dispatch(setFokemon(fokemonData))
      })

    .catch((err => {
      if(err.status === 404)
      history.push("/notfound")
    }))

    .finally(() => {
      //tes
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }, [id, history])

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