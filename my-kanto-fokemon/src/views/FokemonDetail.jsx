import { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchFokemonDetail, setFokemon, setError } from "../store/actions.js"
import LoadingFokeball from "../components/loadingFokeball.jsx"

function FokemonDetail() {
  const dispatch = useDispatch()
  const fokemon = useSelector(state => state.fokemon)
  const error = useSelector(state => state.error)
  const [loading, setLoading] = useState(true)
  let history = useHistory()
  let { id } = useParams()
  
  useEffect(() => {
    let mainDetail = {}

    dispatch(fetchFokemonDetail(id))
      .then(resMain => {
        if(!resMain.ok) {
          let error = new Error(resMain.statusText)
          error.code = resMain.status
          throw error
        } 
        return resMain.json()
      })

      .then(mainData => {
        mainDetail = mainData
        return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      })

      .then(resSecondary => {
        if(!resSecondary.ok) {
          let error = new Error(resSecondary.statusText)
          error.code = resSecondary.status
          throw error
        }
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
        
        setTimeout(() => {
          setLoading(false)
        }, 900)
      })

    .catch(err => {
      dispatch(setError(err))
    })
  }, [id])

  useEffect(() => {
    if(error.code) { //jika fokemon.id tidak ada ( alias error di fetch )
      if(error.code === 404) {
        history.push("/notfound")
      }
    }
  }, [error])

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
          
          <div id="fokemon-detail-container">
            <div id="fokemon-detail">
              <div id="fokebody-info">
                <h3 id="fokemon-form">{ fokemon.form } Fokemon</h3>
                <br/>

                <table>
                  <tbody>
                    <tr>
                      <th>Type</th>
                      <td>{ fokemon.types }</td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{ fokemon.height} m</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>{ fokemon.weight} kg</td>
                    </tr>
                  </tbody>
                </table>

              </div>

              <div id="fokemon-main-image-container">
                <img 
                  id = "fokemon-main-image" 
                  src = { `https://pokeres.bastionbot.org/images/pokemon/${fokemon.id}.png`} 
                  alt = { fokemon.name + "_image" }
                />
              </div>
            </div>
          </div>

          <br/>
          <div id="fokemon-flavor-text">{ fokemon.flavor_text }</div>
          <Link className="return-link" to="/">Return</Link>
        </>
      }
    </div>
  )
}

export default FokemonDetail