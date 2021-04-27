import React from 'react'
import { useHistory } from "react-router-dom"

function FokemonTile(props) {
  let history = useHistory()
  let fokemon = {
    id: props.id,
    name: props.name,
    sprite: props.sprite
  }

  function toFokemonDetail(event) {
    history.push(`/fokedex/${fokemon.id}`)
  }

  return (
    <div 
      className = "fokemon-tile" 
      key = { fokemon.id }
      onClick = { toFokemonDetail }
    >
      <span className = "fokemon-name">
        #{ fokemon.id } { fokemon.name } 
      </span>
      <img 
        className = "sprite" 
        src = { fokemon.sprite } 
        alt = { fokemon.name + "_image" } 
      />
      { props.addToFavorites ?       
        <i 
          className = "fa fa-heart"
          title = "Add to My Favorites"
          onClick = { props.addToFavorites(fokemon) }
        /> :
        <i 
        className = "fa fa-times"
        title = "Remove from My Favorites"
        onClick = { props.removeFromFavorites(fokemon) }
        /> 
      }

    </div>
  )
}
export default FokemonTile