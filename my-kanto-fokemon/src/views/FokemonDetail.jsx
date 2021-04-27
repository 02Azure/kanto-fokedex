import { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"

function FokemonDetail() {
  const [fokemon, setFokemon] = useState({})
  let history = useHistory()
  let { id } = useParams()
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(resDetail => resDetail.json())
      .then(detail => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          .then(resSpecies => resSpecies.json())
          .then(species => {
            let { id, name, height, weight, types } = detail
            name = name[0].toUpperCase() + name.slice(1)
            types = types.map(typeNum => typeNum.type.name[0].toUpperCase() + typeNum.type.name.slice(1)).join("/")

            let flavor_text = species.flavor_text_entries[0].flavor_text
            flavor_text = flavor_text.split(".").join(". ")

            let form = species.egg_groups[0].name
            form = form[0].toUpperCase() + form.slice(1)

            let fokemonData = {
              id, name, form, height, weight, types, flavor_text
            }

            setFokemon(fokemonData)
          })
      })
    .catch((err => console.log(err)))
  }, [])

  function returnToHome(event) {
    event.preventDefault()
    history.push("/")
  }

  return(
    <div id="fokemon-detail-page" className="page">
      <h2>{ "#" + fokemon.id + " " + fokemon.name }</h2>
      <hr/>
      
      <div id="fokemon-detail">
        <div id="fokebody-info">
          <h3 id="fokemon-form">{ fokemon.form } Fokemon</h3>
          <p id="fokemon-flavor-text">
            { fokemon.flavor_text }
          </p>

          <p id="fokemon-height">Height: { fokemon.height / 10 } m</p>
          <p id="fokemon-weight">Weight: { fokemon.weight / 10} kg</p>
          <p id="fokemon-types">Type: { fokemon.types }</p>
        </div>

        <img 
          id = "fokemon-main-image" 
          src = { `https://pokeres.bastionbot.org/images/pokemon/${fokemon.id}.png`} 
          alt = { fokemon.name + "_image" }
        />
      </div>

      <a className="return-link" onClick = { returnToHome } href="/">Return</a>
    </div>
  )
}

export default FokemonDetail